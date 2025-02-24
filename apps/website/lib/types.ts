export type MaybePromise<T> = T | Promise<T>;
export type IfThenElse<T extends boolean, IfTrue, IfFalse> = T extends true
  ? IfTrue
  : T extends false
    ? IfFalse
    : never;
