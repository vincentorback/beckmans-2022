export const randomFromArray = (array) => {
  return array[Math.floor(Math.random() * array.length)]
}

export const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const bad =
  'ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:'
const good =
  'AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------'

export const slugify = (string) => {
  if (!string) return ''

  let newString = string

  for (var i = 0, l = bad.length; i < l; i++) {
    newString = newString.replace(
      new RegExp(bad.charAt(i), 'g'),
      good.charAt(i)
    )
  }

  newString = newString
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text

  return newString
}

export const capitalizeWord = (word) => {
  return word.slice(0, 1).toUpperCase().concat(word.slice(1))
}

export const isUndefined = (value) => value === undefined

export const isEmpty = (value) => {
  return (
    isUndefined(value) ||
    value === null ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  )
}

export const randomNumbers = (amount) => {
  return Math.random()
    .toString()
    .slice(2, 2 + amount)
}
