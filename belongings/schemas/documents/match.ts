import { defineField, defineType } from 'sanity'
import { IoIosFootball as icon } from "react-icons/io";

export default defineType({
  name: 'match',
  title: 'Match',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'venue',
      title: 'Venue',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          "played",
          "fixture",
          "forfeit"
        ]
      },
      initialValue: 'fixture',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'homeTeam',
      title: 'Home team',
      type: 'reference',
      to: [{ type: 'team' }],
    }),
    defineField({
      name: 'awayTeam',
      title: 'Away team',
      type: 'reference',
      to: [{ type: 'team' }],
    }),
    defineField({
      name: 'goals',
      title: 'Goals',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'scorer', title: 'Scorer', type: 'reference', to: [{ type: 'player' }] },
            { name: 'team', title: 'team', type: 'reference', to: [{ type: 'team' }] },
            { name: 'timestamp', title: 'Timestamp', type: 'number' },
          ],
        },
      ],
    }),
    defineField({
      name: 'assists',
      title: 'Assists',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'assister', title: 'assister', type: 'reference', to: [{ type: 'player' }] },
            { name: 'team', title: 'team', type: 'reference', to: [{ type: 'team' }] },
            { name: 'timestamp', title: 'Timestamp', type: 'number' },
          ],
        },
      ],
    }),
    defineField({
      name: 'passes',
      title: 'Passes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'player', title: 'Player', type: 'reference', to: [{ type: 'player' }] },
            { name: 'team', title: 'team', type: 'reference', to: [{ type: 'team' }] },
            { name: 'passes', title: 'passes', type: 'number', initialValue: 46 },
          ],
        },
      ],
    }),
    defineField({
      name: 'tackles',
      title: 'Tackles',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'player', title: 'Player', type: 'reference', to: [{ type: 'player' }] },
            { name: 'team', title: 'team', type: 'reference', to: [{ type: 'team' }] },
            { name: 'tackles', title: 'tackles', type: 'number' },
          ],
        },
      ],
    }),
    defineField({
      name: 'yellowCards',
      title: 'Yellow Cards',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'player' }] }],
    }),
    defineType({
      name: "homeTeamLineup",
      title: "Home team Lineup",
      type: "lineup",
    }),
    defineType({
      name: "awayTeamLineup",
      title: "Away team Lineup",
      type: "lineup",
    }),
    defineField({
      name: 'redCards',
      title: 'red Cards',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'player' }] }],
    }),
    defineField({
      name: 'referee',
      title: 'Referee',
      type: 'reference',
      to: [{ type: 'referee' }]
    }),
    defineField({
      title: 'club report',
      name: 'clubReport',
      type: 'string',
    }),
    defineField({
      name: 'teamStats',
      title: 'team Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'team',
              title: 'team',
              type: 'reference',
              to: [{ type: 'team' }],
            },
            {
              name: 'corners',
              title: 'Corners',
              type: 'number',
            },
            {
              name: 'shotsOnTarget',
              title: 'Shots on Target',
              type: 'number',
            },
            {
              name: 'shots',
              title: 'Shots',
              type: 'number',
            },
            {
              name: 'freeKicks',
              title: 'Free Kicks',
              type: 'number',
            },
            {
              name: 'possession',
              title: 'Possession (%)',
              type: 'number',
            },
          ],
        },
      ],
    }),

  ],
  preview: {
    select: { homeTeam: 'homeTeam.name', awayTeam: 'awayTeam.name' },
    prepare(selection) {
      const { homeTeam, awayTeam } = selection
      return { ...selection, title: 'belongings match', subtitle: (homeTeam && awayTeam) ? `${homeTeam} VS ${awayTeam}` : 'unknown match' }
    }
  },
})
