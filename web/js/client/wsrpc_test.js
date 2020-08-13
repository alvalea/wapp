import * as wsrpc from './wsrpc.js'

/**
 * WebSocket Mock
 */
class MockWS {
  constructor (readyState) {
    this.readyState = readyState
  }

  send (msg) {
    this.onmessage(msg)
  }
}

describe('Test WebSocket RPC', function () {
  afterEach(() => {
    sinon.restore()
  })

  it('test WebSocket not ready', function () {
    const mockWS = new MockWS(0)
    const mock = sinon.mock(mockWS)
    const conn = new wsrpc.Conn(mockWS)

    mock.expects('onmessage').never()

    const msg = {}
    conn.send(msg, function (response) {
    })

    mock.verify()
  })

  it('test WebSocket ready', function () {
    const mockWS = new MockWS(1)
    const mock = sinon.mock(mockWS)
    const conn = new wsrpc.Conn(mockWS)

    mock.expects('onmessage').once()

    const msg = {}
    conn.send(msg, function (response) {
    })

    mock.verify()
  })
})
