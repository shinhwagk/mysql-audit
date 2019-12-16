import * as KoaRouter from 'koa-router';
import { CRSqlGroup } from './input_sqls';
import { IGitlabEmail, sendGitlabResult } from './email';
import { readDbsConfig, IDataSource } from './dbs';
// import { insertSQLS } from './mongo';

interface IGitlabWebHook {
    checkout_sha: string,
    repository: {
        homepage: string,
    }
    commits?: { file: string, author?: { name: string, email: string }, modified?: string[], added?: string[], timestamp?: string }[]
}

export function handler(ctx: KoaRouter.IRouterContext): void {
    const body = ctx.request.body as IGitlabWebHook
    console.debug(body)
    ctx.res.end()
    async () => {
        for (const c of body.commits!) {
            const dbs: IDataSource = readDbsConfig("test")
            gitlabInspect(dbs.host, dbs.port, dbs.user, dbs.pass,
                ["create table abc.abc (a int)"], body)
        }
    }
}

async function gitlabInspect(host: string, port: number, user: string, pass: string, sqls: string[], body: IGitlabWebHook) {
    const csg = new CRSqlGroup(host, port, user, pass, sqls)
    await csg.inspectionSQLs()
    await csg.executeSQLs()
    const ispectRs = csg.crsql.map(cs => {
        return {
            text: cs.sqltext,
            inspections: cs.irs.map(ir => ir.msg || ""),
            execute: cs.ers
        }
    })
    const mailInfo: IGitlabEmail = {
        sha: body.checkout_sha,
        author: body.commits![0].author!,
        url: "",
        sqls: ispectRs
    }
    await sendGitlabResult(mailInfo)
}