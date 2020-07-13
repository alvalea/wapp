let service = null;
let serviceConn = null;

/**
 * serviceEcho
 */
function serviceEcho() {
  args = {
    Number: 11,
    Text: 'hello',
  };

  msg = {
    method: 'Service.Echo',
    params: [args],
  };

  serviceConn.send(msg, function(response) {
    console.log(response.result);
  });
}

/**
 * openTab
 * @param {Event} evt
 * @param {String} tabName
 */
function openTab(evt, tabName) {
  let i;

  const tabcontent = document.getElementsByClassName('tabcontent');
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }

  const tablinks = document.getElementsByClassName('tablinks');
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }

  document.getElementById(tabName).style.display = 'block';
  evt.currentTarget.className += ' active';
}

/**
 * main
 */
function main() {
  document.getElementById('defaultOpen').click();

  service = new WebSocket('ws://localhost:8080/service');
  serviceConn = new wsrpc.Conn(service);
}
