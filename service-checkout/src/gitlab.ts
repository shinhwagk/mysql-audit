import * as KoaRouter from 'koa-router';
import { CRSqlGroup } from './input_sqls';
import { IGitlabEmail, sendGitlabResult } from './email';
// import { insertSQLS } from './mongo';

interface GitlabWebHook {
    checkout_sha: string,
    commits?: { author?: { name: string, email: string }, modified?: string[], added?: string[], timestamp?: string }[]
}

// function parseWebHook(gwh: GitlabWebHook) {
//     gwh
// }

export function handler(ctx: KoaRouter.IRouterContext): void {
    const body = ctx.request.body as GitlabWebHook
    console.debug(body)
    ctx.res.end()
    async () => {
        await gitlabInspect("mysql", 3306, "", "", ["create table abc.abc (a int)"], body)
    }
}

async function gitlabInspect(host: string, port: number, user: string, pass: string, sqls: string[], body: GitlabWebHook) {
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