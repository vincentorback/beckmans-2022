const withTranslateRoutes = require('next-translate-routes/plugin')

const nextConfig = withTranslateRoutes({
  generateBuildId: () => 'build',
  reactStrictMode: true,
  i18n: {
    locales: ['sv', 'en'],
    defaultLocale: 'sv',
    localeDetection: false,
  },
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  translateRoutes: {
    debug: true,
  },
})

module.exports = nextConfig
