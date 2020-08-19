import * as wsrpc from './client/wsrpc.js'
import * as students from './client/students.js'

/**
 * openTab
 * @param {event} evt
 * @param {string} tabName
 */
function openTab (evt, tabName) {
  let i

  const tabcontent = document.getElementsByClassName('tabcontent')
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none'
  }

  const tablinks = document.getElementsByClassName('tablinks')
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '')
  }

  document.getElementById(tabName).style.display = 'block'
  evt.currentTarget.className += ' active'
}

/**
 * connectToService
 * @return {Connection} serviceConn
 */
function connectToService () {
  const service = new WebSocket('wss://192.168.140.128/service')
  const serviceConn = new wsrpc.Conn(service)
  return serviceConn
}

/**
 * setupMenu
 */
function setupMenu () {
  document.getElementById('button1').addEventListener('click', function (evt) {
    openTab(evt, 'Tab1')
  })
  document.getElementById('button2').addEventListener('click', function (evt) {
    openTab(evt, 'Tab2')
  })
  document.getElementById('button3').addEventListener('click', function (evt) {
    openTab(evt, 'Tab3')
  })
  document.getElementById('button1').click()
}

/**
 * main
 */
function main () {
  const serviceConn = connectToService()

  students.init(serviceConn)

  setupMenu()
}

window.addEventListener('load', main)
