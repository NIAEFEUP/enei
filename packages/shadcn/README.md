# @enei/shadcn

## Usage

To use a component provided by this library, import it from `@enei/shadcn`.

```tsx
import { Button } from "@enei/shadcn/ui/button";

export default function Example() {
  return <Button variant="secondary">Click me</Button>;
}
```

and don't forget to import the styles:

```css
@import "@enei/shadcn/styles.css";
```

## Adding a new component

To add a new component to this library, first place the component in a subfolder of the `src/components` directory.

> [!NOTE]
>
> The directory structure of the `src/components` directory is as follows:
>
> - `src/components/ui`: components from https://ui.shadcn.com
> - `src/components/form`: components from https://www.shadcn-form.com
> - `src/components/extension`: components from https://shadcn-extension.vercel.app
> - `src/components/phone-input`: components from https://shadcn-phone-input.vercel.app
