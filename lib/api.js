import { randomFromArray, randomPerson } from '../lib/utilities'

export const getPages = () => {
  return [
    {
      slug: 'om-utstallningen',
      title: 'Om utställningen',
      body: '<p>hej</p>'
    },
    {
      slug: 'press',
      title: 'Press',
      body: '<p>hej</p>'
    },
    {
      slug: 'medverkande',
      title: 'Medverkande',
      body: '<p>hej</p>'
    }
  ]
}

const categories = ['Form', 'Mode', 'Visuell Kommunikation']

export const getContent = () => {
  const random = randomPerson()

  return Array(41).fill(0).map((_, i) => ({
    name: 'Firstname Lastname',
    slug: `firstname-lastname-${i}`,
    category: randomFromArray(categories),
    image: `https://source.unsplash.com/random/200×200?${i}`,
    title: 'Title of work',
    body: '<p>hej hej</p>',
    links: random.links,
    images: [
      'https://source.unsplash.com/random/200x200',
      'https://source.unsplash.com/random/200x200',
      'https://source.unsplash.com/random/200x200',
      'https://source.unsplash.com/random/200x200',
    ]
  })
}
