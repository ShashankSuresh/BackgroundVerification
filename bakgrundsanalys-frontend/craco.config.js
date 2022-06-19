module.exports = {
  babel: {
    presets: ["@babel/preset-env", "@babel/preset-react"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["/"],
          extensions: [".ts", ".tsx", ".jsx", ".js", ".json", "svg"],
          alias: {
            "@saga": "./src/app/saga",
            "@reducers": "./src/app/reducers",
            "@app": "./src/app",
            "@components": "./src/components",
            "@utils": "./src/utils",
            "@pages": "./src/pages",
            "@layout": "./src/layout",
            "@sass": "./src/sass",
            "@translation": "./src/translation",
            "@services": "./src/services",
            "@shared": "./src/shared",
            "@store": "./src/store",
            "@assets": "./src/assets",
            "@src": "./src",
          },
        },
      ],
    ],
    env: {
      production: {
        plugins: ["transform-remove-console"],
      },
    },
  },
};
