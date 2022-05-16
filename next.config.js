const withTranslateRoutes = require('next-translate-routes/plugin')

const IS_PRODUCTION =
  process.env.URL && ['netlify'].includes(process.env.URL.includes) === false

const nextConfig = withTranslateRoutes({
  swcMinify: true,
  generateBuildId: () => 'build',
  reactStrictMode: true,
  i18n: {
    locales: ['sv', 'en'],
    defaultLocale: 'sv',
    localeDetection: IS_PRODUCTION,
  },
  images: {
    formats: ['image/webp'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: 'https://beckmans2022.prismic.io',
        permanent: true,
      },
    ]
  },
})

module.exports = nextConfig
