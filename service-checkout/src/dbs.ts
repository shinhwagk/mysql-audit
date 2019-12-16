import * as fs from 'fs';

export interface IDataSource {
    // name: string
    host: string
    port: number
    user: string
    pass: string
}

// type IDataSourceStrace = { [name: string]: IDataSource }

export function readDbsConfig(name: string): IDataSource {
    const fileContent = fs.readFileSync("./config/dbs.json", { encoding: "utf-8" })
    return JSON.parse(fileContent)[name] as IDataSource
}