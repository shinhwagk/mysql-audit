import got from 'got'
import { sqlexecuterSvcAddr, astparserSvcAddr } from './services'

async function getSQLDigest(id: string, sql: string) {
    const res = await got.post(`http://${astparserSvcAddr}:7000/digest`, { json: { id, sql } })
    return res.body
}

export async function getSQLAst(sql: string): Promise<TOP> {
    const res = await got.post(`http://${astparserSvcAddr}:7000/astparser`, { body: sql })
    return JSON.parse(res.body) as TOP
}

export async function executeSql(host: string, port: number, user: string, pass: string, sqls: string[]): Promise<string[]> {
    const res = await got.post<string[]>({ host: sqlexecuterSvcAddr, port: 7000, url: '/sqlexecutes' }, { json: { host, port, user, pass, sqls } })
    return res.body
}

interface TOP {
    Kind: string
    Ast: any
}


export interface createtable extends TOP {

}

interface alerttable extends TOP {

}


export type InspectionResult = { msg?: string, state: boolean }
export type inpects = (ast: TOP) => InspectionResult

const isKey: inpects = (ast: createtable) => {
    return { msg: "aa", state: true }
}

const isKeyNumber: inpects = (ast: createtable) => {
    return { msg: "aa", state: true }
}

const isKeyNumbe2r: inpects = (ast: alerttable) => {
    return { msg: "aa", state: true }
}



enum AstKind {
    Creteatable,
    aaa
}

export const inspections: { [key: string]: inpects[] } = {
    Creteatable: [
        isKey,
        isKeyNumber,
        isKeyNumbe2r
    ]
}