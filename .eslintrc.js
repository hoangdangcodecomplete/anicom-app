// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  root: true,
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-native/all",
    // `expo` must come after `standard` or its globals configuration will be overridden
    "expo",
    // `jsx-runtime` must come after `expo` or it will be overridden
    "plugin:react/jsx-runtime",
    "prettier",
  ],
  plugins: ["reactotron", "prettier"],
  rules: {},
}
