import { defineField, defineType } from 'sanity'
import { MdPerson as icon } from 'react-icons/md'

export default defineType({
    name: 'referee',
    title: 'Referee',
    type: 'document',
    icon,
    groups: [
        {
            title: "referee Info",
            name: "refereeInfo",
        },
        {
            title: "referee details",
            name: "refereeDetails",
        }],
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            group: 'refereeInfo',
            validation: Rule => Rule.required().min(3).max(300).warning("please provide a name for the referee"),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 100,
            },
        }),
        defineField({
            name: 'age',
            title: 'Age',
            type: 'number',
            group: 'refereeInfo',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'weight',
            title: 'weight',
            type: 'number',
            group: 'refereeInfo',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'height',
            title: 'Height',
            group: 'refereeInfo',
            type: 'number',
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            group: 'refereeInfo',
        }),
    ],
    preview: {
        select: { title: 'name', media: 'image' },
        prepare(selection) {
            const { title } = selection
            return { ...selection, subtitle: title ? `${title} referee` : 'unknown referee' }
        }
    },
})
