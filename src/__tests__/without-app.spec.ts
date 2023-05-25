import { io } from "socket.io-client"
import pEvent from "p-event"
import { expect } from "@loopback/testlab"

describe("Test socket connection", () => {
    it("connect to socket io server", async () => {
        const url = "http://127.0.0.1:19007"
        const socket = io(url)

        socket.emit("greeting", "Hello")
        const response = await pEvent(socket, "greeting-response")
        expect(response).to.match("Hello")
        socket.disconnect()
    })
})
