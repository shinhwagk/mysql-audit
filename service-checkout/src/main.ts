import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import * as bodyParser from "koa-bodyparser";

import { handler as gitlabHandler } from './gitlab'
import { handler as sqlsHandler } from './input_sqls'

const koa = new Koa()
const koaRouter = new KoaRouter()

koaRouter.get("/", (ctx) => ctx.res.end())
koaRouter.post("/webhook/gitlab", gitlabHandler)
// koaRouter.post("/file", routeHandler2)
koaRouter.post("/sqls", sqlsHandler)

koa.use(bodyParser({ enableTypes: ["json", "form"] }))
    .use(koaRouter.routes())
    .use(koaRouter.allowedMethods())
    .listen(8000)