var net = require('net')
var args = process.argv.splice(2)
var port = process.env.TEST_PORT || 4567
var enable = !!args.shift()

console.log('args port=%s setNoDelay(%s)', port, enable ? 'true' : 'false')

var server = net.createServer(function(connection) {
  console.log('connection')
})

server.listen(port)

server.on('listening', function() {
  var socket = new net.Socket()

  socket.connect(port, function() {
    console.log('client connected')
    socket.setNoDelay(enable)
    for (var i=0; i<10000; i++) {
      socket.write(new Buffer('a'))
    }
    socket.end(new Buffer('b'))
    socket.end()
    socket.on('end', function() {
      server.close(process.exit)
    })
  })
})
