function MockWS() {
  this.readyState = 1;
}

MockWS.prototype.onmessage = function(ev) {
  console.log('onmessage');
};

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

  args = {
    Number: 11,
    Text: 'hello',
  };

  msg = {
    method: 'Service.Echo',
    params: [args],
  };

  it('test send', function() {
    conn.send(msg, function(response) {
      const result = JSON.parse(response.result);

      expect(result.Number).toEqual(args.Number);
      expect(result.Text).toEqual(args.Text);
    });
  });
});
