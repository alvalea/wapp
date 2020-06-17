function MockWS() {
  this.readyState = 1;
}

MockWS.prototype.onmessage = function(ev) {
  console.log("onmessage");
};

MockWS.prototype.send = function(msg) {
  var s = JSON.parse(msg);

  var ev = {
    data: JSON.stringify({
      id:0,
      result:JSON.stringify(s.params[0]), 
      error:null
    })
  };

  this.onmessage(ev)
};

describe('Test connection', function() {
  var mockWS = new MockWS();
  var conn   = new wsrpc.Conn(mockWS);

  args = {
    Number : 11,
    Text   : "hello"
  };

  msg = {
    method: "Service.Echo",
    params: [args],
  };

  it('test send', function() {
    conn.send(msg, function (response) {
      var result = JSON.parse(response.result);

      expect(result.Number).toEqual(args.Number);
      expect(result.Text).toEqual(args.Text);
    });
  });
});
