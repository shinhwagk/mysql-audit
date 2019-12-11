import * as KoaRouter from 'koa-router';
import { insertSQLS } from './mongo';

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