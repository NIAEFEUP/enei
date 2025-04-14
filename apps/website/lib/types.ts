export type MaybePromise<T> = T | Promise<T>;
export type IfThenElse<T extends boolean, IfTrue, IfFalse> = T extends true
  ? IfTrue
  : T extends false
    ? IfFalse
    : never;

export type StrictExclude<T, U extends T> = T extends U ? never : T;
export type StrictExtract<T, U extends T> = T extends U ? T : never;
export type StrictExtends<Target, Actual extends Target> = Actual;

export type AnyRecord = Record<keyof any, unknown>;

export type DistributiveKeyOf<T> = T extends unknown ? keyof T : never;
export type FlattenUnion<T extends AnyRecord> = {
  [K in DistributiveKeyOf<T>]: T extends unknown
    ? K extends keyof T
      ? T[K] extends AnyRecord
        ? FlattenUnion<T[K]>
        : T[K]
      : undefined
    : never;
};

export type EqualsOrNever<Target, Actual> = (
  Target extends Actual ? (Actual extends Target ? true : false) : false
) extends true
  ? Actual
  : never;
