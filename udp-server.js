const dgram = require('dgram');

const settings = require('./appsettings.json');

const server = dgram.createSocket(settings.udpSocketType);

server.on('message', (msg, rinfo) => {
  console.log({ msg, rinfo });
});

server.bind(settings.udpServerPort, settings.udpserverHost, () => {
  console.log('server up, on port ' + settings.udpServerPort);
});
