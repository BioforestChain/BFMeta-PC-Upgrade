import { BindingKey } from "@loopback/core"

export namespace GlobalBindings {
    export const CONFIG = BindingKey.create("component.GlobalConfiguration")

    export const SERVICE_UPGRADE = BindingKey.create("service.UpgradeService")
}
