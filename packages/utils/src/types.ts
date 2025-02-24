export type MaybePromise<T> = T | Promise<T>
export type TypedFunction<Args extends unknown[] = any[], Return = unknown> = (...args: Args) => Return;

// https://stackoverflow.com/questions/46583883/typescript-pick-properties-with-a-defined-type
export type PickByType<T, Value> = {
    [P in keyof T as T[P] extends Value ? P : never]: T[P]
}
