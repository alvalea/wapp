var service     = new WebSocket("ws://localhost:8080/service");
var serviceConn = new wsrpc.Conn(service);

function serviceEcho() {
    args = {
        Number  : 11,
        Text    : "hello"
    };

    msg = {
        method: "Service.Echo",
        params: [args],
    };

    serviceConn.send(msg, function (response) {
        console.log(response.result);
    });
}

function openTab(evt, tabName) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

function main() {
  document.getElementById("defaultOpen").click();
}
