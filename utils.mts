import { getCollection } from 'astro:content'


const languages = await getCollection('languages')
export const locales = languages.map(entry => entry.id)


export function getLocaleUrl(url: URL, locale: string) {
    const
        parts = url.pathname.split('/').slice(2),
        slug = parts.join('/')

    return new URL(`/${locale}/${slug}`, url.origin)
}

export async function getLanguagePaths() {
    return languages.map(entry => (
            {
                params: { locale: entry.id },
                props: entry.data 
            }
        )
    )
}