import { dynamicImport, type DefaultImport, type LazyImport } from "./dynamic-import.js";
import type { TypedFunction } from "./types.js";

export function defer<
    M extends DefaultImport<TypedFunction>,
    >(factory: LazyImport<M>) {
        type DeferredFunction = M["default"];

        return async (...args: Parameters<DeferredFunction>) => {
            const deferredFunction = await dynamicImport([factory, "default"]);
            return deferredFunction(...args) as ReturnType<DeferredFunction> ;
        }
    }