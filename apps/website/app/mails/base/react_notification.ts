import { BaseMail } from '@adonisjs/mail'
import { render } from '@react-email/components'
import type { JSX } from 'react'

type JSXImport<T = {}> = () => Promise<{ default: (props: T) => JSX.Element }>

export abstract class ReactNotification extends BaseMail {
  async jsx<T = {}>(importer: JSXImport<T>, props: NoInfer<T>) {
    const component = await importer().then((mod) => mod.default)
    const element = component(props)

    this.message.html(await render(element)).text(await render(element, { plainText: true }))
  }

  abstract prepare(): void | Promise<void>
}
