import { defineType } from "sanity";

export default defineType({
    type: 'object',
    name: 'socialMedia',
    title: 'social Media',
    fieldsets: [
      {name: 'social', title: 'Social media'}
    ],
    fields: [
      {
        title: 'Name',
        name: 'name',
        type: 'string'
      },
      {
        title: 'Twitter',
        name: 'twitter',
        type: 'string',
        fieldset: 'social'
      },
      {
        title: 'Instagram',
        name: 'instagram',
        type: 'string',
        fieldset: 'social'
      },
      {
        title: 'Facebook',
        name: 'facebook',
        type: 'string',
        fieldset: 'social'
      }
    ]
  })