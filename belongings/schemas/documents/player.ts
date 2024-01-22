import { defineField, defineType } from 'sanity'
import { MdPerson as icon } from 'react-icons/md'

export default defineType({
    name: 'player',
    title: 'Player',
    type: 'document',
    icon,
    groups: [
        {
            title: "Player Info",
            name: "playerInfo",
        },
        {
            title: "player details",
            name: "playerDetails",
        }],
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            group: 'playerInfo',
            validation: Rule => Rule.required().min(3).max(300).warning("please provide a name for the player"),
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
            group: 'playerInfo',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'weight',
            title: 'weight',
            type: 'number',
            group: 'playerInfo',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'height',
            title: 'Height',
            group: 'playerInfo',
            type: 'number',
        }),
        defineField({
            name: 'wearingNumber',
            title: 'Wearing Number',
            group: 'playerDetails',
            type: 'number',
        }),
        defineField({
            name: 'team',
            title: 'team',
            type: 'reference',
            to: [{ type: 'team' }],
            group: 'playerDetails',
        }),
        defineField({
            name: 'position',
            title: 'Position of Player',
            type: 'string',
            options: {
                list: [
                    { value: "GK", title: 'Goalkeeper' },
                    { value: "CB", title: 'Center-back' },
                    { value: "FB", title: 'Full-back' },
                    { value: "WB", title: 'Wing-back' },
                    { value: "CM", title: 'Central midfielder' },
                    { value: "DM", title: 'Defensive midfielder' },
                    { value: "AM", title: 'Attacking midfielder' },
                    { value: "WM", title: 'Wide midfielder' },
                    { value: "CF", title: 'Center forward' },
                    { value: "ST", title: 'Striker' },
                    { value: "W", title: 'Winger' },
                ]
            },
            group: 'playerDetails',
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            group: 'playerInfo',
        }),
        defineField({
            name: 'socialMedia',
            title: 'Social Media',
            type: 'socialMedia'
        })
    ],
    preview: {
        select: { title: 'name', media: 'image', place: 'position', team: 'team.name' },
        prepare(selection) {
            const { title, place, team } = selection
            return { ...selection, subtitle: title ? `${title} :: ${place} :: ${team}` : 'unknown player' }
        }
    },
})
