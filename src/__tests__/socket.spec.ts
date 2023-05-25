import { io } from "socket.io-client"
import pEvent from "p-event"
import { expect } from "@loopback/testlab"

import { BFChainUpgradeApplication } from "../application"
import { ConfigurationBuilder, JsonConfigurationSource } from "../shared/ConfigurationBuilder"
import path from "path"

describe("Test socket connection", () => {
    let app: BFChainUpgradeApplication

    before("setupApplication", async () => {
        app = await givenApplication()
    })

    after(async () => {
        await app.stop()
    })

    it("connect to socket io server", async () => {
        const url = app.socketServer.url
        const socket = io(url)

        socket.emit("greeting", "Hello")
        const response = await pEvent(socket, "greeting-response")
        expect(response).to.match("Hello")
        socket.disconnect()
    })

    async function givenApplication() {
        // 构建基础服务配置
        const options = new ConfigurationBuilder()
            .scan(path.join(process.cwd(), "config"), (files) => {
                return files.map((file) => new JsonConfigurationSource(file))
            })
            .build()
        app = new BFChainUpgradeApplication(options)
        await app.bootstrap()

        const url = app.socketServer.url
        console.log(`Server is running at ${url}`)

        return app
    }
})
