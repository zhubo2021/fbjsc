module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: "vue-eslint-parser",
  extends: ["plugin:vue/essential", "eslint:recommended"],
  // sourceType: module,
  ignorePatterns: ["public/"],
  rules: {
    "no-console": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-unused-vars": "off",
    "no-var-requires": "off",
    "vue/multi-word-component-names": "off",
    // 使用循环组件会报错
    // "no-unused-components": "off",
    // ;分号
    semi: 0,
  },
  parserOptions: {
    sourceType: "module",
  },
  globals: {
    BMap: true,
  },
  plugins: ["vue"],
}
