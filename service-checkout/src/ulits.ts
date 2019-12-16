export function simapleParseFileToSqls(fileContent: string): string[] {
    return fileContent.split(";")
}