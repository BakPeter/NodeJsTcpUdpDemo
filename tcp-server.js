const net = require('net');

const settings = require('./appsettings.json');
console.log('tcpServer settings: ' + JSON.stringify(settings));

const tcpServer = net
  .createServer((socket) => {
    socket.write('tcp client connected via socket, socket: ' + socket);
    console.log(socket);

    socket.on('data', (data) => {
      console.log('Recived data: ' + data + ', from: ' + socket.address());
    });
  })
  .on('listening', () => {
    console.log(
      'tcpServer listenning on: ',
      JSON.stringify(tcpServer.address())
    );
  })
  .listen(settings.tcpServerPort, settings.tcpServerHostName);
