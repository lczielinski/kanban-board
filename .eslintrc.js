module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'linebreak-style': 'off',
    'react/jsx-filename-extension': [1, { "extensions": [".js", ".jsx"] }],
    "react/jsx-props-no-spreading": [1, {"html": "ignore"}]
  },
};
