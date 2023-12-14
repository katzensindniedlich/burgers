const 
    locales = ['en', 'de'],
    regex = /((([a-zA-Z]+(-[a-zA-Z0-9]+){0,2})|\*)(;q=[0-1](\.[0-9]+)?)?)*/g


function parse(header){
    var matches = (header || '').match(regex)

    return matches.map(match => {
        if (!match) return

        var 
            bits = match.split(';'),
            ietf = bits[0].split('-'),
            hasScript = ietf.length === 3

        return {
            code: ietf[0],
            script: hasScript? ietf[1]: null,
            region: hasScript? ietf[2]: ietf[1],
            quality: bits[1]? parseFloat(bits[1].split('=')[1]): 1.0
        }
    })
    .filter(e => e)
    .sort((a, b) => b.quality - a.quality)
}


export function onRequest(context) {
    const 
        request = context.request,
        origin = new URL(request.url).origin,
        header = request.headers.get('Accept-Language')

    for (const { code } of parse(header)) {
        if (code === '*') break

        if (locales.includes(code)) {
            return new Response.redirect(`${origin}/${code}/`, 302)
        }
    }

    return new Response.redirect(`${origin}/en/`, 302)
}