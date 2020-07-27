const PAGE_SIZE = 5

let m_serviceConn = null
let m_page = 1

/**
 * setupListeners
 */
function setupListeners () {
  document.getElementById('students-searchInput').addEventListener('keyup', serviceSearch)
  document.getElementById('students-prev').addEventListener('click', function () {
    serviceFind(-1)
  })
  document.getElementById('students-next').addEventListener('click', function () {
    serviceFind(1)
  })
}

/**
 * init
 * @param {Connection} conn
 */
function init (conn) {
  m_serviceConn = conn

  disable(document.getElementById('students-prev'))
  disable(document.getElementById('students-next'))

  setupListeners()
}

/**
 * serviceFind
 * @param {number} arg
 */
function serviceFind (arg) {
  m_page = m_page + arg
  if (m_page === 0) {
    m_page = 1
  }

  if (m_page === 1) {
    disable(document.getElementById('students-prev'))
  } else {
    enable(document.getElementById('students-prev'))
  }

  const input = document.getElementById('students-searchInput')
  const args = { Input: input.value, Page: m_page, PageSize: PAGE_SIZE }
  const msg = {
    method: 'Service.Find',
    params: [args]
  }

  m_serviceConn.send(msg, function (response) {
    document.getElementById('students-result').innerText =
      JSON.stringify(response.result)

    if (response.result.Students == null) {
      disable(document.getElementById('students-next'))
    } else {
      enable(document.getElementById('students-next'))
    }
  })
}

/**
 * hideDropdown
 */
function hideDropdown () {
  const div = document.getElementById('students-searchDropdown')
  const a = div.getElementsByTagName('a')

  for (let i = 0; i < a.length; i++) {
    a[i].style.display = 'none'
  }
}

/**
 * fillDropdown
 * @param {Response} response
 */
function fillDropdown (response) {
  const input = document.getElementById('students-searchInput')
  const div = document.getElementById('students-searchDropdown')
  const a = div.getElementsByTagName('a')
  for (let i = 0; i < response.result.Students.length; i++) {
    a[i].textContent = response.result.Students[i].Name
    a[i].style.display = 'block'
    a[i].addEventListener('click', function () {
      input.value = a[i].textContent
      input.focus()
    })
  }
}

/**
 * serviceSearch
 */
function serviceSearch () {
  const input = document.getElementById('students-searchInput')
  if (input.value === '') {
    hideDropdown()
    return
  }

  if (window.event.key === 'Enter') {
    hideDropdown()
    m_page = 1
    serviceFind(0)
    return
  }

  const args = { Input: input.value }
  const msg = { method: 'Service.Search', params: [args] }
  m_serviceConn.send(msg, function (response) {
    hideDropdown()

    if (response.result.Students == null) {
      return
    }

    fillDropdown(response)
  })
}

/**
 * disable
 * @param {anchor} button
 */
function disable (button) {
  button.style.pointerEvents = 'none'
  button.style.cursor = 'default'
  button.className = 'inactive'
}

/**
 * enable
 * @param {anchor} button
 */
function enable (button) {
  button.style.pointerEvents = 'auto'
  button.style.cursor = 'pointer'
  button.className = ''
}

export { init, serviceFind, serviceSearch }
