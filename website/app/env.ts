import vine from '@vinejs/vine'
import { ConstructableSchema, SchemaTypes } from '@vinejs/vine/types'
import { EnvProcessor, Env as AdonisEnv } from '@adonisjs/core/env'

type Primitives = string | number | boolean | null

function createObjectInterceptor() {
  const keys = new Set<string>()

  function object<Properties extends Record<string, SchemaTypes>>(schema: Properties) {
    Object.keys(schema).forEach((key) => keys.add(key))
    return vine.object(schema)
  }

  return {
    keys,
    object,
  }
}

type SchemaBuilderProps = {
  object: ReturnType<typeof createObjectInterceptor>['object']
}

type SchemaBuilder<Schema extends ConstructableSchema<any, any, any>> = (
  props: SchemaBuilderProps
) => Schema

export async function defineEnv<
  const PublicPrefix extends string,
  const Schema extends ConstructableSchema<Record<string, Primitives>, any, any>,
>(appUrl: URL, publicPrefix: PublicPrefix, builder: SchemaBuilder<Schema>) {
  const { keys, object } = createObjectInterceptor()
  const schema = builder({ object })

  const runtimeEnvEntries = keys
    .values()
    .filter((key) => key in process.env)
    .map((key) => [key, process.env[key]])

  const runtimeEnv = Object.fromEntries(runtimeEnvEntries)
  const staticEnv = await new EnvProcessor(appUrl).process()
  const env = Object.assign({}, staticEnv, runtimeEnv)

  const validator = vine.compile(schema)

  const [error, validatedEnv] = await validator.tryValidate(env)

  if (error) {
    const messages = error.messages as { message: string }[]
    const reason = messages.map(({ message }) => `- ${message}`).join('\n')

    throw new Error(`Environment validation failure\n\n${reason}`)
  }

  return new PublicPrivateEnv(validatedEnv, publicPrefix)
}

type ExtractPublicKeys<T extends Record<string, any>, Prefix extends string> = Extract<
  keyof T,
  `${Prefix}${string}`
>

type PickPublic<T extends Record<string, any>, Prefix extends string> = Pick<
  T,
  ExtractPublicKeys<T, Prefix>
>

class PublicPrivateEnv<
  const PublicPrefix extends string,
  EnvValues extends Record<string, any>,
> extends AdonisEnv<EnvValues> {
  #publicKeys: string[]

  constructor(values: EnvValues, publicPrefix: PublicPrefix) {
    super(values)
    this.#publicKeys = Object.keys(values).filter((key) => key.startsWith(publicPrefix))
  }

  public() {
    return Object.fromEntries(this.#publicKeys.map((key) => [key, this.get(key)])) as PickPublic<
      EnvValues,
      PublicPrefix
    >
  }
}
