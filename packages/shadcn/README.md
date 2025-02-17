# @enei/shadcn

## Usage

To use a component provided by this library, import it from `@enei/shadcn`.

```tsx
import { Button } from "@enei/shadcn/button";

export default function Example() {
  return <Button variant="secondary">Click me</Button>;
}
```

and don't forget to import the styles:

```css
@import "@enei/shadcn/styles.css";
```

## Adding a new component

To add a new component to this library, first place the component in the `src/components` directory.

> [!NOTE]
> The `src/components/ui` directory is reserved for components from https://ui.shadcn.com.

Then, run the following command to generate the necessary files and exports:

```bash
pnpm turbo gen shadcn-component
```
