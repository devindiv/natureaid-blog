// sanity/schemaTypes/index.ts
import {StructureResolver} from 'sanity/desk'
import author from './author'
import category from './category'
import post from './post'
import twitter from './twitter'
import parentChild from '../parentChild'
import table from './table'
import {testimonialSchema} from './testimonial'
import consultationSchema from './consultation'

export const schemaTypes = [
  post,
  author,
  category,
  twitter,
  table,
  testimonialSchema,
  consultationSchema,
]

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      parentChild('category', S, context.documentStore),
      S.divider(),
      S.documentTypeListItem('post').title('Posts'),
      S.divider(),
      S.documentTypeListItem('testimonial').title('Testimonials'),
      S.divider(),
      S.documentTypeListItem('consultation').title('Consultation Requests'),
      S.divider(),
      S.documentTypeListItem('author').title('Authors'),
      S.divider(),
      S.documentTypeListItem('twitter').title('Twitter'),
      S.documentTypeListItem('table').title('Table'),
    ])
