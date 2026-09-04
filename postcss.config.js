console.log("??/");

export default {
  plugins: {
    // Сначала разрешение @import (должен идти перед остальными плагинами)
    "postcss-import": {},
    "postcss-nested": {},
    "postcss-preset-env": {
      stage: 3,
      features: {
        "nesting-rules": false,
        "custom-properties": true,
      },
    },
  },
};
