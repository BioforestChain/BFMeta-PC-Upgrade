import { BindingKey } from "@loopback/core"
import { Log4js as Log4jsFactory } from "log4js"

import { Log4jsComponent } from "./component"

export namespace Log4jsBindings {
    export const COMPONENT = BindingKey.create<Log4jsComponent>("components.Log4jsComponent")

    export const LOG4JS_FACTORY = BindingKey.create<Log4jsFactory>("logging.log4js.factory")
}
