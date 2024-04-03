import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'author',
  title: 'Authors',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Author Name', type: 'string'}),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug of the author',
      options: {
        source: 'name',
      },
    }),
  ],
  // Customize the preview so parents are visualized in the studio
})
