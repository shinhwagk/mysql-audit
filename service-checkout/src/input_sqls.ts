import * as KoaRouter from 'koa-router';
import { insertSQLS } from './mongo';
import { InspectionResult, getSQLAst, inspections, createtable, executeSql } from './inspection';

// interface SQLS {
//     checkout_sha: string,
//     commits?: { author?: { name: string, email: string }, modified?: string[], added?: string[], timestamp?: string }[]
// }

// function parseWebHook(gwh: GitlabWebHook) {
//     gwh

// }

export async function handler(ctx: KoaRouter.IRouterContext): Promise<void> {
    const sqls = ctx.request.body as string[]
    insertSQLS(sqls)
    ctx.res.end()
}

class CRSql {

    public irs: InspectionResult[] = []
    public ers: string = ""

    constructor(public sqltext: string) { }

    async inspections(): Promise<void> {
        const ast = await getSQLAst(this.sqltext)
        inspections[ast.Kind].forEach(i =>
            this.irs.push(i(ast.Ast))
        )
    }

    public static create = (sql: string) => new CRSql(sql)
}

export class CRSqlGroup {
    crsql: CRSql[] = []
    constructor(private host: string, private port: number, private user: string, private pass: string, private sqltexts: string[]) {
        this.crsql = sqltexts.map(CRSql.create)
    }

    async inspectionSQLs() {
        for (const s of this.crsql) {
            await s.inspections()
        }
    }

    async executeSQLs() {
        let irsState = true
        for (const s of this.crsql) {
            const errCnt = s.irs.filter(ir => !ir.state)
            if (errCnt.length >= 1) {
                irsState = false
                break
            }
        }
        if (!irsState) {
            return this.sqltexts.map(s => "") //return same length emty array
        }
        return await executeSql(this.host, this.port, this.user, this.pass, this.sqltexts)
    }
    // public static create = (sqls: string[]) => new CRSqlGroup(sqls)
}