import * as fs from "fs"

import { IConfigurationSource } from "./type"

export class JsonConfigurationSource implements IConfigurationSource {
    private readonly content: string

    constructor(filePath: string) {
        this.content = fs.readFileSync(filePath, {
            encoding: "utf-8"
        })
    }

    process(): Record<string, any> {
        return JSON.parse(this.content)
    }
}
