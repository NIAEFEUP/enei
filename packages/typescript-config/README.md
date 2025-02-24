# `@enei/typescript-config`

This package provides a set of TypeScript configurations for different use cases.

## Configurations

All configurations provide good defaults for TypeScript projects, with strict type checking enabled. Furthermore, incremental compilation is enabled and ESNext is targeted, by default.

> [!WARNING] When using any of these configurations, make sure to set the `outDir` and `tsBuildInfoFile` options.
>
> ```json
> {
>   // Emit
>   "outDir": "./node_modules/.tmp/tsconfig/build",
>
>   // Projects
>   "tsBuildInfoFile": "./node_modules/.tmp/tsconfig/build.tsbuildinfo"
> }
> ```

## Server Configurations

This package provides the following server configurations:

- `server/tsconfig.app.json`: Configuration for server-side applications (e.g., an AdonisJS backend).
- `server/tsconfig.library.json`: Configuration for server-side libraries, with reusable logic.
- `server/tsconfig.react-library.json`: Configuration for server-side libraries, that use React components (e.g., an e-mail components library).

In these configurations, source maps and decorator metadata are emitted.

## Client Configurations

This package provides the following client configurations:

- `client/tsconfig.app.json`: Configuration for client-side applications (e.g., a React SPA).
- `client/tsconfig.library.json`: Configuration for client-side libraries, with reusable logic.
- `client/tsconfig.react-library.json`: Configuration for client-side libraries, that use React components (e.g., a UI library).

In these configurations, ES2021 is targeted and DOM types are included.

## Common Configurations

This package provides the following common configurations:

- `common/tsconfig.library.json`: Configuration for libraries, with reusable logic.
- `common/tsconfig.react-library.json`: Configuration for libraries, that use React components (e.g., a UI library).

These configurations are similar to the client configurations, but do not include DOM types. This means that these configurations are suitable for libraries that are meant to be used in both the browser and Node.js environments.

## Tools Configurations

This package provides the following tools configurations:

- `tools/tsconfig.json`: Configuration for tools (e.g., to lint an ESLint configuration).

In these configurations, no code is emitted.
