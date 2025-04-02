# `@enei/typescript-config`

This package provides a set of TypeScript configurations for different use cases.

## Configurations

All configurations provide good defaults for TypeScript projects, with strict type checking enabled. Furthermore, incremental compilation is enabled.

> [!WARNING] When using any of these configurations, make sure to set the `rootDir`, `outDir` and `tsBuildInfoFile` options.
>
> ```json
> {
>   // Modules
>   "rootDir": "./src",
>
>   // Emit
>   "outDir": "./dist",
>
>   // Projects
>   "tsBuildInfoFile": "./dist/tsconfig.lib.tsbuildinfo"
> }
> ```

## Usage

This package provides the following server configurations:

- `env/client`: Configuration for client-side applications and libraries (e.g., a React SPA).
- `env/common`: Configuration for libraries, with reusable logic.
- `env/server`: Configuration for server-side applications and libraries (e.g., an AdonisJS backend).
- `env/tools`: Configuration for tools (e.g., to lint an ESLint configuration).
- `type/app`: Configuration for applications.
- `type/bundled`: Configuration for bundled libraries.

In your project, you should extend one environment configuration from the `env` directory, and at most one type configuration from the `type` directory.
