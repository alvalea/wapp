let service = null;
let serviceConn = null;

let page = 1;
const pageSize = 5;

/**
 * serviceFind
 * @param {number} arg
 */
function serviceFind(arg) {
  page = page + arg;
  if (page == 0) {
    page = 1;
  }

  if (page == 1) {
    disable(document.getElementById('prev'));
  } else {
    enable(document.getElementById('prev'));
  }

  const input = document.getElementById('searchInput');
  args = {Input: input.value, Page: page, PageSize: pageSize};
  msg = {
    method: 'Service.Find',
    params: [args],
  };

  serviceConn.send(msg, function(response) {
    document.getElementById('result').innerText =
          JSON.stringify(response.result);

    if (response.result.Students == null) {
      disable(document.getElementById('next'));
    } else {
      enable(document.getElementById('next'));
    }
  });
}

/**
 * hideDropdown
 */
function hideDropdown() {
  const div = document.getElementById('searchDropdown');
  a = div.getElementsByTagName('a');

  for (i = 0; i < a.length; i++) {
    a[i].style.display = 'none';
  }
}

/**
 * serviceSearch
 */
function serviceSearch() {
  const input = document.getElementById('searchInput');
  if (input.value == '') {
    hideDropdown();
    return;
  }

  if (window.event.key == 'Enter') {
    hideDropdown();
    page = 1;
    serviceFind(0);
    return;
  }

  args = {Input: input.value};
  msg = {
    method: 'Service.Search',
    params: [args],
  };
  serviceConn.send(msg, function(response) {
    hideDropdown();

    const div = document.getElementById('searchDropdown');
    a = div.getElementsByTagName('a');
    for (let i=0; i<response.result.Students.length; i++) {
      a[i].textContent = response.result.Students[i].Name;
      a[i].style.display = 'block';
      a[i].addEventListener('click', function(){
        input.value = a[i].textContent;
	input.focus();
      });
    }
  });
}

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
 */
function connectToService() {
  service = new WebSocket('ws://localhost:8080/service');
  serviceConn = new wsrpc.Conn(service);
}

/**
 * disable
 * @param {anchor} button
 */
function disable(button) {
  button.style.pointerEvents='none';
  button.style.cursor='default';
  button.className='inactive';
}

/**
 * enable
 * @param {anchor} button
 */
function enable(button) {
  button.style.pointerEvents='auto';
  button.style.cursor='pointer';
  button.className='';
}

/**
 * main
 */
function main() {
  showDefaultTab();

  connectToService();

  disable(document.getElementById('prev'));
}
