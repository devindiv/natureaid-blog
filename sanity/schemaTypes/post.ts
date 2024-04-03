/*import {FileText} from 'lucide-react'

export default {
  name: 'post',
  type: 'document',
  title: 'Post',
  icon: FileText,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title of the post',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug of the article',
      options: {
        source: 'title',
      },
    },
    {
      name: 'shortDescription',
      type: 'string',
      title: 'short description of the post',
    },
    {
      name: 'titleImage',
      type: 'image',
      title: 'Title image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        {
          type: 'block',
        },
      ],
    },
    {
      name: 'category',
      type: 'reference',
      to: [{type: 'category'}],
      options: {filter: 'defined(parent)'},
    },
    {
      name: 'featured',
      title: 'is this a featured post',
      type: 'boolean',
    },
  ],
}*/

import {FileText} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: FileText,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'shortDescription',
      type: 'string',
      title: 'short description of the post',
    }),
    defineField({
      name: 'titleImage',
      title: 'Title image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'content',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'twitter',
        },
        {
          type: 'image',
        },
      ],
    }),
    defineField({
      name: 'category',
      type: 'reference',
      to: [{type: 'category'}],
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: [{type: 'author'}],
    }),
    defineField({
      name: 'featured',
      title: 'is this a featured post',
      type: 'boolean',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
