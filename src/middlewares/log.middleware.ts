import { SockIOMiddleware } from "@loopback/socketio"

export const LogMiddleware: SockIOMiddleware = (socket, next) => {
    console.log("[LogMiddleware] Client connected: %s", socket.id)
    next()
}
