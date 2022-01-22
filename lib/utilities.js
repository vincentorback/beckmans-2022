import randomWords from 'random-words'

export const randomFromArray = (array) => {
  return array[Math.floor(Math.random() * array.length)]
}

export const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const randomPerson = (index) => {
  const name = randomWords({
    min: 2,
    max: 3,
    join: ' ',
    formatter: (word, wordIndex) => (wordIndex === 0 ? capitalizeWord(word) : word),
  })
  const category = randomFromArray(['Form', 'Mode', 'Visuell Kommunikation'])

  return {
    name: name,
    category: category,
    slug: slugify(category) + '/' + slugify(name),
    image: `https://source.unsplash.com/random/400×400/?${category}q=10`,
    title: 'Title of work',
    body: '<p>Body of work</p>',
    links: [
      {
        href: 'mailto:name@email.com',
        label: 'name@email.com',
      },
      {
        href: '@nameoninstagram',
        label: '#/',
      }
    ],
    images: [
      `https://source.unsplash.com/random/?${category}?${index}`,
      `https://source.unsplash.com/random/?${category}?${index + 1}`,
      `https://source.unsplash.com/random/?${category}?${index + 2}`,
      `https://source.unsplash.com/random/?${category}?${index + 3}`,
    ]
  }
}

const bad =
  'ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:'
const good =
  'AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------'

export const slugify = (string) => {
  let newString = string

  for (var i = 0, l = bad.length; i < l; i++) {
    newString = newString.replace(new RegExp(bad.charAt(i), 'g'), good.charAt(i))
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

export const debounce = (fn, delay) => {
  let timeout = -1

  return (...args) => {
    if (timeout !== -1) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(fn, delay, ...args)
  }
}

export const randomColor = () => {
  let color = '#'

  for (let i = 0; i < 6; i += 1) {
    const random = Math.random()
    const bit = (random * 16) | 0
    color += (bit).toString(16)
  }

  return color
}
