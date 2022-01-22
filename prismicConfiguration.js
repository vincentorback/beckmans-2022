import { slugify } from './lib/utilities'

export const repoName = 'beckmans2022'
export const apiEndpoint = `https://${repoName}.cdn.prismic.io/api/v2`
export const accessToken = process.env.PRISMIC_ACCESS_TOKEN

export const linkResolver = (doc) => {
  if (doc.type === 'page') {
    return `/${doc.uid}`
  }

  if (doc.type === 'project') {
    return `/${slugify(doc.data.category)}/${doc.uid}`
  }

  return '/'
}

export const Router = {
  routes: [
    {
      type: 'project',
      path: '/:uid',
    },
  ],
}
