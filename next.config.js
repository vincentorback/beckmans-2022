const withTranslateRoutes = require('next-translate-routes/plugin')

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
      {
        source: '/admin',
        destination: 'https://beckmans2022.prismic.io',
        permanent: true,
      },
    ]
  },
})

module.exports = nextConfig
