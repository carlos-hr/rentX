module.exports = {
  singleQuote: true,
  extends: ['prettier', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
  operatorLinebreak: false,
};
