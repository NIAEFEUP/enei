export type PickByKeyType<T, U> = {
  [P in keyof T as P extends U ? P : never]: T[P];
};

export type PickByType<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P];
};

export type Simplify<T> = {
  [K in keyof T]: T[K];
} & {};

export type Entries<T extends Record<string, unknown>> = {
  [K in keyof T]: [K, T[K]];
}[keyof T];

declare const ERROR: unique symbol;
export type ErrorMessage<Message extends string> = { [ERROR]: Message };

export type Merge<
  T extends Record<PropertyKey, unknown>,
  U extends Record<PropertyKey, unknown>,
> = {
  [K in keyof T | keyof U]: K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

export type FromEntries<T extends [PropertyKey, unknown][]> = T extends [
  [infer Key extends PropertyKey, infer Value],
  ...infer Rest extends [PropertyKey, unknown][],
]
  ? Rest extends []
    ? { [K in Key]: Value }
    : Merge<{ [K in Key]: Value }, FromEntries<Rest>>
  : never;
