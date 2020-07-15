/**
 * WebSocket Mock
 */
function MockWS() {
  this.readyState = 1;
  this.onmessage = null;
}

MockWS.prototype.send = function(msg) {
  const s = JSON.parse(msg);

  const ev = {
    data: JSON.stringify({
      id: 0,
      result: JSON.stringify(s.params[0]),
      error: null,
    }),
  };

  this.onmessage(ev);
};

describe('Test connection', function() {
  const mockWS = new MockWS();
  const conn = new wsrpc.Conn(mockWS);

  args = {Page: 1, PageSize: 5};
  msg = {
    method: 'Service.Find',
    params: [args],
  };

  it('test send', function() {
    conn.send(msg, function(response) {
      const result = JSON.parse(response.result);

      expect(result.Page).toEqual(args.Page);
    });
  });
});
