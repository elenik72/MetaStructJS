module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
    jest: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    parser: 'babel-eslint'
  },
  rules: {
    'no-multi-spaces': 'error',
    'no-trailing-spaces': 'error',
    indent: ['error', 2]
  }
}
