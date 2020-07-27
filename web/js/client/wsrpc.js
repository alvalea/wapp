/**
 * WebSocket Connection
 */
class Conn {
  /**
   * constructor
   * @param {WebSocket} webSocket
   */
  constructor (webSocket) {
    this.id = 0
    this.callbacks = new Map()

    this.ws = webSocket
    this.ws.onmessage = (ev) => {
      this.recvResponse(ev.data)
    }
  }

  send (msg, cb) {
    // CONNECTING
    if (this.ws.readyState === 0) {
      setTimeout(function () {
        this.send(msg, cb)
      }, 100)
    }
    // OPEN
    else if (this.ws.readyState === 1) {
      this.sendRequest(msg, cb)
    }
  }

  /**
   * sendRequest
   * @param {Message} msg
   * @param {Callback} cb
   */
  sendRequest (msg, cb) {
    const id = this.id++

    this.callbacks.set(id, cb)

    const request = {}
    request.id = id
    for (const i in msg) {
      request[i] = msg[i]
    }

    this.ws.send(JSON.stringify(request))
  }

  /**
   * recvResponse
   * @param {Connection} conn
   * @param {Data} data
   */
  recvResponse (data) {
    const response = JSON.parse(data)
    if (this.callbacks.has(response.id)) {
      const cb = this.callbacks.get(response.id)
      cb(response)
      this.callbacks.delete(response.id)
    }
  }
}

export { Conn }
