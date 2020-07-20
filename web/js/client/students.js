const students = (function() {
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
      disable(document.getElementById('students-prev'));
    } else {
      enable(document.getElementById('students-prev'));
    }

    const input = document.getElementById('students-searchInput');
    args = {Input: input.value, Page: page, PageSize: pageSize};
    msg = {
      method: 'Service.Find',
      params: [args],
    };

    serviceConn.send(msg, function(response) {
      document.getElementById('students-result').innerText =
        JSON.stringify(response.result);

      if (response.result.Students == null) {
        disable(document.getElementById('students-next'));
      } else {
        enable(document.getElementById('students-next'));
      }
    });
  }

  /**
   * hideDropdown
   */
  function hideDropdown() {
    const div = document.getElementById('students-searchDropdown');
    a = div.getElementsByTagName('a');

    for (i = 0; i < a.length; i++) {
      a[i].style.display = 'none';
    }
  }

  /**
   * serviceSearch
   */
  function serviceSearch() {
    const input = document.getElementById('students-searchInput');
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

      if (response.result.Students == null) {
        return;
      }

      const div = document.getElementById('students-searchDropdown');
      a = div.getElementsByTagName('a');
      for (let i=0; i<response.result.Students.length; i++) {
        a[i].textContent = response.result.Students[i].Name;
        a[i].style.display = 'block';
        a[i].addEventListener('click', function() {
          input.value = a[i].textContent;
          input.focus();
        });
      }
    });
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

  return {
    serviceFind: serviceFind,
    serviceSearch: serviceSearch,
    hideDropdown: hideDropdown,
    disable: disable,
    enable: enable,
  };
}());
