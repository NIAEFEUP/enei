import { configApp, RULES_LIST } from "@adonisjs/eslint-config";

// Downgrade all lints to warnings
import "eslint-plugin-only-warn";

export default configApp(
  {
    name: "Custom config for Inertia",
    files: ["inertia/**/*.ts", "inertia/**/*.tsx"],
    ignores: ["inertia/components/ui/**/*", ".adonisjs/**/*"],
    rules: RULES_LIST,
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: "off"
    },
    rules: {
      "prettier/prettier": "off",
    },
  },
);
