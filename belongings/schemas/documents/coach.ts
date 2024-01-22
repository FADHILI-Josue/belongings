import { defineField, defineType } from 'sanity'
import { MdPerson as icon } from 'react-icons/md'

export default defineType({
    name: 'coach',
    title: 'Coach',
    type: 'document',
    icon,
    groups: [
        {
            title: "Coach Info",
            name: "coachInfo",
        },
        {
            title: "Coach details",
            name: "coachDetails",
        }],
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            group: 'coachInfo',
            validation: Rule => Rule.required().min(3).max(300).warning("please provide a name for the Coach"),
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
            group: 'coachInfo',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'weight',
            title: 'weight',
            type: 'number',
            group: 'coachInfo',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'height',
            title: 'Height',
            group: 'coachInfo',
            type: 'number',
        }),
        defineField({
            name: 'team',
            title: 'team',
            type: 'reference',
            to: [{ type: 'team' }],
            group: 'coachDetails',
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            group: 'coachInfo',
        }),
        defineField({
            name: 'socialMedia',
            title: 'Social Media',
            type: 'socialMedia',
            group: 'coachDetails',
        })
    ],
    preview: {
        select: { title: 'name', media: 'image', team: 'team.name' },
        prepare(selection) {
            const { title, team } = selection
            return { ...selection, subtitle: title ? `${title} of ${team}` : 'unknown Coach' }
        }
    },
})
