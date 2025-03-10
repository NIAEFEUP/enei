import * as tailwindcss from "prettier-plugin-tailwindcss";
import edgejs from "./plugins/edgejs.js";

import js from "./options/js.js";
import json from "./options/json.js";
import md from "./options/md.js";

/** @type {import('prettier').Config} */
export default {
  plugins: [edgejs, tailwindcss],
  overrides: [
    { files: ["*.json"], options: json },
    { files: ["*.md"], options: md },
  ],
  ...js,
};
