import { BootMixin } from "@loopback/boot"
import { SocketIoApplication } from "@loopback/socketio"
import { ApplicationConfig } from "@loopback/core"
import { TypeOrmMixin } from "@loopback/typeorm"

import { SocketController } from "./controllers/socket.controller"
import { Log4jsBindings, Log4jsComponent } from "./components/Log4jsComponent"
import { GlobalBindings } from "./shared/binding"
import { UpgradeService } from "./services"
import { Version } from "./entities/version.model"

/**
 * 生物链林节点升级应用
 */
export class BFChainUpgradeApplication extends BootMixin(TypeOrmMixin(SocketIoApplication)) {
    constructor(options: ApplicationConfig = {}) {
        super(options)

        // 指定loopback依赖扫描的路径
        this.projectRoot = __dirname
        this.connection({
            ...options.dataSource,
            entities: [Version]
        })

        // 绑定全局配置
        this.bind(GlobalBindings.CONFIG).to(options)

        // 配置logging中间件
        this.configure(Log4jsBindings.LOG4JS_FACTORY).to(options.logging)
        this.component(Log4jsComponent)

        // 注册服务
        this.bind(GlobalBindings.SERVICE_UPGRADE).toClass(UpgradeService)
        // 注册路由
        this.socketServer.route(SocketController)
    }

    async bootstrap() {
        await this.boot()
        await this.start()
    }
}
