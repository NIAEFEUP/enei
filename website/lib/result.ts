/* eslint-disable handle-callback-err */

type Result<T, E> = (T extends never ? never : Ok<T>) | (E extends never ? never : Err<E>)

export class ExpectationFailedError extends Error {
  constructor(message: string) {
    super(message)
  }
}

export class Ok<T> {
  static of<T>(value: T) {
    return new Ok(value)
  }

  readonly isOk = true as const
  readonly isErr = false as const

  constructor(public readonly value: T) {}

  isOkAnd(fn: (value: T) => boolean) {
    return fn(this.value)
  }

  isErrAnd(_fn: (error: never) => boolean) {
    return false
  }

  and<R extends Result<unknown, unknown>>(result: R) {
    return result
  }

  andThen<R extends Result<unknown, unknown>>(fn: (value: T) => R) {
    return fn(this.value)
  }

  or<R extends Result<unknown, unknown>>(_result: R) {
    return this
  }

  orElse<R extends Result<unknown, unknown>>(_fn: (error: never) => R) {
    return this
  }

  expect(_message: string) {
    return this.value
  }

  expectErr(message: string): never {
    throw new ExpectationFailedError(message)
  }

  unwrapOr<U>(_defaultValue: U) {
    return this.value
  }

  unwrapOrElse<U>(_fn: (error: never) => U) {
    return this.value
  }

  awaited() {
    return Promise.resolve(this.value).then(Ok.of).catch(Err.of)
  }

  map<U>(fn: (value: T) => U) {
    return Ok.of(fn(this.value))
  }

  flatMap<R extends Result<unknown, unknown>>(fn: (value: T) => R) {
    return fn(this.value)
  }
}

export class Err<E> {
  static of<E>(error: E) {
    return new Err(error)
  }

  readonly isOk = false as const
  readonly isErr = true as const

  constructor(public readonly error: E) {}

  isOkAnd(_fn: (value: never) => boolean) {
    return false
  }

  isErrAnd(fn: (error: E) => boolean) {
    return fn(this.error)
  }

  and<R extends Result<unknown, unknown>>(_result: R) {
    return this
  }

  andThen<R extends Result<unknown, unknown>>(_fn: (value: never) => R) {
    return this
  }

  or<R extends Result<unknown, unknown>>(result: R) {
    return result
  }

  orElse<R extends Result<unknown, unknown>>(fn: (error: E) => R) {
    return fn(this.error)
  }

  expect(message: string): never {
    throw new ExpectationFailedError(message)
  }

  expectErr(_message: string) {
    return this.error
  }

  unwrapOr<U>(defaultValue: U) {
    return defaultValue
  }

  unwrapOrElse<U>(fn: (error: E) => U) { 
    return fn(this.error)
  }

  awaited() {
    return this
  }

  map<U>(_fn: (_value: never) => U) {
    return this
  }

  flatMap<R extends Result<unknown, unknown>>(_fn: (value: never) => R) {
    return this
  }
}
