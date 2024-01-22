import { defineField, defineType } from 'sanity'
import { RiTeamFill as icon } from "react-icons/ri";


export default defineType({
    name: 'team',
    title: 'Team',
    type: 'document',
    icon,
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            description: 'Team name',
        }),
        defineField({
            name: 'abbr',
            title: 'Short Name',
            type: 'string',
            description: 'short name of team like MUN',
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
            name: 'logo',
            title: 'Logo',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: "players",
            title: "Players",
            type: "array",
            of: [{ type: "reference", to: { type: "player" } }],
                }),
        defineField({
            name: 'stadium',
            title: 'Stadium',
            type: 'string',
            description: 'Stadium name',
            initialValue: 'Nyabihu Stadium',
        }),
        defineField({
            name: 'coach',
            title: 'Coach',
            type: 'reference',
            description: 'team coach',
            to: {type: 'coach'}
        }),
    ],
    preview: {
        select: { title: 'name', media: 'logo' },
    },
})
