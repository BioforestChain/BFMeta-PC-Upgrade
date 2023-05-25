import * as fs from "fs"
import { resolve } from "path"

import { IConfigurationBuilder, IConfigurationSource } from "./type"

/**
 * 构建应用配置
 */
export class ConfigurationBuilder implements IConfigurationBuilder {
    /**
     * 构建后的配置
     * @protected 受保护的
     */
    public properties: Record<string, any> = {}

    /**
     * 需要构建的配置源
     * @protected 受保护的
     */
    public sources: IConfigurationSource[] = []

    /**
     * 扫描指定目录中的json文件
     * @param path 需要扫描json的目录
     * @param fileHandler 文件处理函数
     */
    public scan(path: string, fileHandler: (files: string[]) => IConfigurationSource[]): IConfigurationBuilder {
        // 读取文件目录
        const files = fs.readdirSync(path)

        // 存在文件
        if (files.length) {
            // 调处理函数处理文件并加载source
            const sources = fileHandler(files.map((file) => resolve(path, file)))
            this.add(...sources)
        }
        return this
    }

    /**
     * 添加额外的配置源
     * @param source 指定配置源
     */
    public add(...source: IConfigurationSource[]): IConfigurationBuilder {
        this.sources = this.sources.concat(source)
        return this
    }

    public build(): Record<string, any> {
        this.sources.forEach((source) => {
            this.properties = {
                ...this.properties,
                ...source.process()
            }
        })
        return this.properties
    }
}
