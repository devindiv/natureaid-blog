import {StructureResolver} from 'sanity/desk'
import author from './author'
import category from './category'
import post from './post'
import twitter from './twitter'
import parentChild from '../parentChild'

export const schemaTypes = [post, author, category, twitter]

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      parentChild('category', S, context.documentStore),
      S.divider(),
      // ...all other list items
    ])
