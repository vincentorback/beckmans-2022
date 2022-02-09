const isProduction = process.env.NETLIFY

const withTranslateRoutes = require('next-translate-routes/plugin')

const nextConfig = withTranslateRoutes({
  generateBuildId: () => 'build',
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['sv', 'en'],
    defaultLocale: 'sv',
    localeDetection: true,
  },
  experimental: {
    reactRemoveProperties: true,
    removeConsole: isProduction,
  },
})

module.exports = nextConfig
