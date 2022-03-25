module.exports = {
  root: true,
  plugins: ['prettier', 'react'],
  extends: ['next/core-web-vitals', 'prettier'],
  rules: {
    'no-unused-vars': 'error',
  },
}
