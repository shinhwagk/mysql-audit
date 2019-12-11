import got from 'got'

async function getSQLDigest(id: string, sql: string) {
    const res = await got.post(`http://${astparserSvcAddr}:3000/digest`, { json: { id, sql } })
    return res.body
}

function getSQLAst(id: string, sql: string) {
    const res = await got.post(`http://${astparserSvcAddr}:3000/ast`, { json: { id, sql } })
    return res.body
}