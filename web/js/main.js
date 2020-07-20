/**
 * openTab
 * @param {event} evt
 * @param {string} tabName
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
 * showDefaultTab
 */
function showDefaultTab() {
  document.getElementById('defaultOpen').click();
}

/**
 * connectToService
 * @return {Connection} serviceConn
 */
function connectToService() {
  const service = new WebSocket('ws://localhost:8080/service');
  const serviceConn = new wsrpc.Conn(service);
  return serviceConn;
}

/**
 * main
 */
function main() {
  showDefaultTab();

  const serviceConn = connectToService();
  students.init(serviceConn);
}
