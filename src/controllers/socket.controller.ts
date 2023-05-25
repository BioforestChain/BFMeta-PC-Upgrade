import { socketio, Socket } from "@loopback/socketio"
import { inject } from "@loopback/core"

import { Log4jsLogger, log4js } from "../components/Log4jsComponent"
import { UpgradeService } from "../services"
import { GlobalBindings } from "../shared/binding"

@socketio("/")
export class SocketController {
    // 注入当前socket对象
    @socketio.socket()
    private readonly socket: Socket

    // 日志工厂函数
    @log4js.logger()
    private readonly logger: Log4jsLogger

    // 主动升级服务
    @inject(GlobalBindings.SERVICE_UPGRADE)
    private readonly upgradeService: UpgradeService

    @socketio.connect()
    async connect(socket: Socket) {
        this.logger.debug("Client connected: %s", socket.id)
    }

    @socketio.subscribe("greeting")
    async onGreeting(msg: string) {
        this.logger.info("Client send message to event {%s} and say: %s", "greeting", msg)
        await this.upgradeService.getAll()
        this.socket.emit("greeting-response", msg)
    }
}
