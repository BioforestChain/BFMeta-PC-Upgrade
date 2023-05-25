import { Component, ContextTags, injectable, ProviderMap, Binding } from "@loopback/core"

import { Log4jsBindings } from "./bindings"
import { Log4jsLoggerFactoryProvider } from "./log4js"

@injectable({ tags: { [ContextTags.KEY]: Log4jsBindings.COMPONENT } })
export class Log4jsComponent implements Component {
    providers: ProviderMap
    bindings: Binding<unknown>[]

    constructor() {
        this.providers = {
            [Log4jsBindings.LOG4JS_FACTORY.key]: Log4jsLoggerFactoryProvider
        }
    }
}
