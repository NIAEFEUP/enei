# `@enei/vite-config`

## Usage

To use this library, import it from `@enei/vite-config`.

```tsx
import publish from "@enei/vite-config/publish";

export default defineConfig({ plugins: [publish()] });
```

The `publish` plugin will automatically define entry points for your library, according to the `exports` field in your `package.json` file.

Dependencies will be automatically externalized, using `vite-plugin-externalize-deps`, and declaration files will be generated using `vite-plugin-dts`.

## Configuration

The `publish` plugin accepts an optional configuration object with the following properties:

- `tsconfigPath`: The path to the TypeScript configuration file.
