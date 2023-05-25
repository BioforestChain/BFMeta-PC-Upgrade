import * as path from "path"

import { BFChainUpgradeApplication } from "./application"
import { Log4jsBindings, Log4jsLogger } from "./components/Log4jsComponent"
import { ConfigurationBuilder, JsonConfigurationSource } from "./shared/ConfigurationBuilder"

let logger: Log4jsLogger

/**
 * 应用入口函数
 * @param options 服务配置
 */
export async function main() {
    // 构建基础服务配置
    const options = new ConfigurationBuilder()
        .scan(path.join(process.cwd(), "config"), (files) => {
            return files.map((file) => new JsonConfigurationSource(file))
        })
        .build()
    // 初始化应用
    const app = new BFChainUpgradeApplication(options)
    // 启动应用
    await app.bootstrap()

    logger = (await app.get(Log4jsBindings.LOG4JS_FACTORY)).getLogger()
    logger.info("Server is running at url: %s", app.socketServer.url)

    return app
}

if (require.main === module) {
    main().catch((err) => {
        console.log("Cannot start the application: %s", err)
        process.exit()
    })
}
