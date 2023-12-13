import { defineCollection } from 'astro:content'


const Languages = defineCollection({
    type: 'data'
})

export const collections = {
    'languages': Languages
}