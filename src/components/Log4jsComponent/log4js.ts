import { config, Provider } from "@loopback/core"
import { Configuration, Log4js as Log4jsFactory, configure } from "log4js"

export class Log4jsLoggerFactoryProvider implements Provider<Log4jsFactory> {
    constructor(@config() private options: Configuration) {}

    async value() {
        return configure(this.options)
    }
}
