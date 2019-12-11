import * as KoaRouter from 'koa-router';
import { insertSQLS } from './mongo';

interface GitlabWebHook {
    checkout_sha: string,
    commits?: { author?: { name: string, email: string }, modified?: string[], added?: string[], timestamp?: string }[]
}

function parseWebHook(gwh: GitlabWebHook) {
    gwh

}

export function handler(ctx: KoaRouter.IRouterContext): void {
    ctx.request.body as GitlabWebHook
    ctx.res.end()
}