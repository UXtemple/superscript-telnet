// Run this and then telnet to localhost:2000 and chat with the bot

const chokidar = require('chokidar')
const net = require('net')
const superscript = require('superscript').default
const mongoose = require('mongoose')
const fs = require('fs')
const parser = require('ss-parser').default

let sockets = []
let bot = null

function receiveData(socket, data) {
  // Handle incoming messages.
  let message = '' + data

  message = message.replace(/[\x0D\x0A]/g, '')

  if (message.indexOf('/quit') === 0 || data.toString('hex',0,data.length) === 'fff4fffd06') {
    socket.end('Good-bye!\n')
    return
  }

  if (!bot) {
    socket.write(`Ash> I'm not ready yet.`)
    return
  }

  // Use the remoteIP as the name since the PORT changes on ever new connection.
  bot.reply(socket.remoteAddress, message.trim(), function(err, reply) {
    if (err) {
      console.error('error', err)
      socket.write(`ERROR: ${err.message}\n`)
    }

    socket.write('\nAsh> ' + reply.string + '\n')
    socket.write('You> ')
  })
}

function closeSocket(socket) {
  sockets = sockets.filter(s => s !== socket)
  console.log(`- user ${socket.name}\n`)
}

function newSocket(socket) {
  socket.name = socket.remoteAddress + ':' + socket.remotePort
  console.log(`+ user ${socket.name}\n`)

  sockets.push(socket)

  socket.write(`Ash> Hi ${socket.name}! Type /quit to disconnect.\n`)
  socket.write('You> ')

  socket.on('data', data => receiveData(socket, data))
  socket.on('end', () => closeSocket(socket))
}

// Start the TCP server.
const server = net.createServer(newSocket)

const options = {
  importFile: './data.json',
  mongoose: mongoose.connect('mongodb://localhost/telnetbot')
}

server.listen(2000)
console.log('Server ready. Join with npm run join.')

function fail(error) {
  console.error(`x: ${err}`)
  sockets.forEach(socket => socket.write(`x: ${error.toString()}`))
}

function build(done) {
  console.log('.')
  sockets.forEach(socket => socket.write('.'))

  parser.parseDirectory(`${__dirname}/chat`, (err, result) => {
    if (err) return fail(err)

    fs.writeFile(options.importFile, JSON.stringify(result, null, 4), (err) => {
      if (err) return fail(err)
      done()
    })
  })
}
function ready() {
  console.log('!')
  sockets.forEach(socket => socket.write('!\nYou> '))
}

chokidar.watch(__dirname, {ignored: /(^|[\/\\])\../}).on('all', () => {
  build(() => {

    // Main entry point
    superscript.setup(options, (error, next) => {
      if (error) return fail(error)
      ready()
      bot = next
    })

  })
})
