import {defineType} from 'sanity'

export default defineType({
  type: 'object',
  name: 'twitter',
  title: 'Twitter Post',
  fields: [
    {
      type: 'string',
      name: 'id',
      description: 'Paste your Twitter post id',
    },
  ],
})
