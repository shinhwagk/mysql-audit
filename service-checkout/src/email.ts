import got from "got";
import { emailSvcAddr } from "./services";


export interface IGitlabEmail {
    sha: string
    url: string
    author: { name: string, email: string }
    sqls: {
        text: string
        inspections: string[]
        execute: string
    }[]
}
export async function sendGitlabResult(ge: IGitlabEmail): Promise<void> {
    got.post({ host: emailSvcAddr, port: 7000, url: "/gitlab" }, { json: ge })
}