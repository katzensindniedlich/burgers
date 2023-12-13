import { getCollection } from 'astro:content'


const languages = await getCollection('languages')
export const locales = languages.map(entry => entry.id)


export function getLocaleUrl(url: URL, locale: string) {
    const
        parts = url.pathname.split('/').slice(2),
        slug = parts.join('/')

    return new URL(`/${locale}/${slug}`, url.origin)
}

export function getLocale(url: URL) {
    return url.pathname.split('/').at(1) || undefined
}

export async function getLanguagePaths() {
    return languages.map(entry => {
            return {
                params: { locale: entry.id },
                props: { text: entry.data }
            }
        }
    )
}