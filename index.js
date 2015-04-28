var pcap = require('pcap')
var tcp = new pcap.TCPTracker()
  , sess = pcap.createSession('lo0', 'ip proto \\tcp')

tcp.on('session', function(session) {
  console.log('session start - src=%s dst=%s', session.src_name, session.dst_name)
  session.on('end', function(session) {
    console.log('session end - src=%s dst=%s', session.src_name, session.dst_name)
  })
})

sess.on('packet', function(raw) {
  var packet = pcap.decode.packet(raw)
  tcp.track_packet(packet)
  var h = packet.pcap_header
  var pay = packet.payload.payload
  console.log('packet - length=%d', h.len)
})
