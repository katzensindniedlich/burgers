import { getCollection } from 'astro:content'


export async function getLanguagePaths() {
    const languages = await getCollection('languages')

    return languages.map(entry => {
            return {
                params: { locale: entry.id },
                props: { text: entry.data, meta: entry.data.meta}
            }
        }
    )
}