const withTranslateRoutes = require('next-translate-routes/plugin')

const isProduction = Boolean(
  process.env.URL && !process.env.URL.includes('netlify')
)

const nextConfig = withTranslateRoutes({
  generateBuildId: () => 'build',
  reactStrictMode: true,
  i18n: {
    locales: ['sv', 'en'],
    defaultLocale: 'sv',
    localeDetection: isProduction,
  },
  images: {
    formats: isProduction ? ['image/avif', 'image/webp'] : ['image/webp'],
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
