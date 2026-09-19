import { fileURLToPath } from "node:url";
import postcssImport from "postcss-import";
import postcssMixins from "postcss-mixins";
import postcssNested from "postcss-nested";
import postcssPresetEnv from "postcss-preset-env";

const mixinsPath = fileURLToPath(new URL("./src/app/style/mixins.pcss", import.meta.url));

export default {
  plugins: [
    {
      postcssPlugin: "project-mixins",
      Once(root) {
        // Каждый отдельно обрабатываемый CSS-файл получает общий каталог миксинов.
        root.prepend({ name: "import", params: JSON.stringify(mixinsPath) });
      },
    },
    postcssImport(),
    postcssMixins(),
    postcssNested(),
    postcssPresetEnv({
      stage: 3,
      features: {
        "nesting-rules": false,
        "custom-properties": true,
      },
    }),
  ],
};
