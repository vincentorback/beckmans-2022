export const LAUNCH_DATE = 'May 18, 2022 23:59:59 UTC+02:00'

export const categories = ['product-design', 'visual-communication', 'fashion']

export const SESSION_STARTED = 'started'
export const SESSION_CATEGORY = 'filter'
export const SESSION_ITEM = 'item'

export const defaultLocale = 'sv'
export const localeStrings = {
  sv: 'sv-se',
  en: 'en-us',
}

export const SITE_URL = process.env.URL ?? 'https://beckmans.college/2022'

export const IS_PRODUCTION =
  process.env.URL && ['netlify'].includes(process.env.URL.includes) === false
