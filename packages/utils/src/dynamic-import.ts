export type BaseModule = {};
export type DefaultImport<T> = { default: T };
export type LazyImport<T> = () => Promise<T>;

export type LazyImportSpecifier<M extends BaseModule, P extends keyof M> = [LazyImport<M>, P];
export type ResolveLazyImportSpecifier<S extends LazyImportSpecifier<any, any>> = 
    S extends LazyImportSpecifier<infer M, infer P>
        ? M[P]
        : never;

export async function dynamicImport<M extends BaseModule, P extends keyof M>(specifier: LazyImportSpecifier<M, P>) {
    const [lazyImport, key] = specifier;
    const module = await lazyImport();
    return module[key];
}
