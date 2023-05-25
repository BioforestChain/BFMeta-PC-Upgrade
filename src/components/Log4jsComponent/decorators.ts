import { inject } from "@loopback/core"

import { Log4jsBindings } from "./bindings"

export namespace log4js {
    export function factory() {
        return inject(Log4jsBindings.LOG4JS_FACTORY)
    }

    export function logger(category?: string) {
        return inject("", undefined, async (ctx, injection, session) => {
            const fac = await ctx.get(Log4jsBindings.LOG4JS_FACTORY)
            return fac.getLogger(category)
        })
    }
}
