const isDevelopment = !process.env.NETLIFY

module.exports = {
  root: true,
  plugins: ['prettier', 'react'],
  extends: ['next/core-web-vitals', 'prettier'],
  rules: {
    'no-unused-vars': isDevelopment ? 0 : 'error',
  },
}
