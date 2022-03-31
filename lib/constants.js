export const categories = ['product-design', 'visual-communication', 'fashion']

export const SESSION_RETURNING = 'returning'
export const SESSION_STARTED = 'started'
export const SESSION_CATEGORY = 'filter'

export const defaultLocale = 'sv'
export const localeStrings = {
  sv: 'sv-se',
  en: 'en-us',
}

export const SITE_URL = process.env.URL ?? 'https://beckmans.college/2022'

export const IS_PRODUCTION =
  process.env.URL && !process.env.URL.includes('netlify')
