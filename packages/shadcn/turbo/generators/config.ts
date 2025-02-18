import type { PlopTypes } from "@turbo/gen";
import fs from "fs/promises";
import { resolve, relative } from "path";

// Learn more about Turborepo Generators at https://turbo.build/repo/docs/core-concepts/monorepos/code-generation

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // A simple generator to add a new React component to the internal UI library
  plop.setGenerator("shadcn-component", {
    description: "Exports a new shadcn component",
    prompts: [
      {
        type: "input",
        name: "path",
        message: "What is the path of the component? (e.g. ./ui/accordion)",
        filter: (input: string) => {
          return input.startsWith("./") ? input.substring(2) : input;
        },
        validate: async (input: string) => {
          const path = input.startsWith("./") ? input.substring(2) : input;
          const root = resolve(__dirname, "../..");
          const resolvedPath = resolve(root, "src/components", `${path}.tsx`);

          return await fs
            .access(resolvedPath, fs.constants.R_OK)
            .then(() => true)
            .catch(() => `Component ${relative(root, resolvedPath)} does not exist`);
        },
      },
    ],
    actions: [
      {
        type: "add",
        path: "lib/components/{{ path }}.ts",
        templateFile: "templates/barrel-file.hbs",
      },
      {
        type: "append",
        path: "package.json",
        pattern: /"exports": {.*?(?<insertion>)(?=[ \n]*})/gs,
        template: ',\n    "./{{ path }}": "./src/components/{{path}}.tsx"',
        separator: "",
      },
      {
        type: "append",
        path: "vite.config.ts",
        pattern: /entry: {.*?(?<insertion>)(?=[ \n]*})/gs,
        template:
          "\n        \"lib/components/{{path}}\": resolve(__dirname, 'lib/components/{{path}}'),",
        separator: "",
      },
    ],
  });
}
