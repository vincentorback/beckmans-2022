const isProduction = process.env.NETLIFY
const withTranslateRoutes = require('next-translate-routes/plugin')
const categories = ['form', 'visual-communication', 'fashion']

const nextConfig = withTranslateRoutes({
  generateBuildId: () => 'build',
  reactStrictMode: true,
  i18n: {
    locales: ['sv', 'en'],
    defaultLocale: 'sv',
    localeDetection: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      ...categories.map((category) => ({
        source: `/${category}`,
        destination: `/?category=${category}`,
        permanent: false,
      })),
    ]
  },
})

module.exports = nextConfig
