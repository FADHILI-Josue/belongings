import { defineField, defineType } from "sanity";

export default defineType({
    name: "lineup",
    title: "Lineup",
    type: "object",
    fields: [
        defineField({
            name: "formation",
            title: "Formation",
            type: "string",
        }),
        defineField({
            name: "startingEleven",
            title: "Starting Eleven",
            type: "array",
            of: [{ type: "reference", to: { type: "player" } }],
            validation: Rule => Rule.unique().max(11)
            // TODO:: Adding the minimum to 11
            // validation: Rule => Rule.unique().max(11).min(11)
        }),
    ]
});