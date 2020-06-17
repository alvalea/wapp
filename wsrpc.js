var wsrpc = (function() {
  function Conn(URL) {
    this.id		= 0;
    this.callbacks 	= {};

    this.ws = new WebSocket(URL);
    const self = this;
    this.ws.onmessage = function(ev) {
      recvResponse(self, ev.data);
    };
  }

  Conn.prototype.send = function(msg, cb) {
    // CONNECTING
    if (this.ws.readyState === 0) {
      setTimeout(function() {
        this.send(msg, cb);
      }, 100);
    }
    // OPEN
    else if (this.ws.readyState === 1) {
      sendRequest(this, msg, cb);
    }
  };

  function sendRequest(conn, msg, cb) {
    id = conn.id++;

    conn.callbacks[id] = cb;

    const request = {};
    request.id = id;
    for (const i in msg) request[i] = msg[i];

    conn.ws.send(JSON.stringify(request));
  }

  function recvResponse(conn, data) {
    const response = JSON.parse(data);
    if (conn.callbacks.hasOwnProperty(response.id)) {
      conn.callbacks[response.id](response);
      delete conn.callbacks[response.id];
    }
  }

  return {
    Conn: Conn,
  };
}());
