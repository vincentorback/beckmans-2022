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

export const SITE_URL = process.env.URL ?? 'https://2022.beckmans.college'

export const IS_PRODUCTION = SITE_URL && !SITE_URL.includes('netlify')
