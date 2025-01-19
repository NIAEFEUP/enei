export type Equals<T, U> = keyof T extends keyof U
  ? keyof U extends keyof T
    ? true
    : false
  : false

export type If<T extends boolean, U> = T extends true ? U : never

export type ObjectFromKeys<Keys extends readonly string[], V> = Keys extends [
  infer K extends string,
  ...infer Rest extends readonly string[],
]
  ? { [key in K]: V } & ObjectFromKeys<Rest, V>
  : {}
