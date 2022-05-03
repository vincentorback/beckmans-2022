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
  if (isEmpty(string)) return ''

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

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const clamp = (min, mid, max) => {
  return Math.max(min, Math.min(mid, max))
}

export function getYoutubeID(url = '') {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  var match = url.match(regExp)
  return match && match[7].length == 11 ? match[7] : false
}

export function easeInOutExpo(t, b, c, d) {
  if (t == 0) return b
  if (t == d) return b + c
  if ((t /= d / 2) < 1) return (c / 2) * Math.pow(2, 10 * (t - 1)) + b
  return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b
}

export function easeInOutCirc(t, b, c, d) {
  if ((t /= d / 2) < 1) return (-c / 2) * (Math.sqrt(1 - t * t) - 1) + b
  return (c / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + b
}

/* TOOD */

export function easeInOutQuad(t, b, c, d) {
  if ((t /= d / 2) < 1) return (c / 2) * t * t + b
  return (-c / 2) * (--t * (t - 2) - 1) + b
}

export function easeInOutCubic(t, b, c, d) {
  if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b
  return (c / 2) * ((t -= 2) * t * t + 2) + b
}

export function easeInOutQuart(t, b, c, d) {
  if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t + b
  return (-c / 2) * ((t -= 2) * t * t * t - 2) + b
}

export function easeInOutQuint(t, b, c, d) {
  if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t * t + b
  return (c / 2) * ((t -= 2) * t * t * t * t + 2) + b
}

export function easeInOutSine(t, b, c, d) {
  return (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b
}
