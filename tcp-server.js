const net = require('net');

const settings = require('./appsettings.json');
console.log('[Server], settings: ' + JSON.stringify(settings));

const tcpServer = net
  .createServer((socket) => {
    socket.write('[Server] tcp client connected via socket');

    const socketData = {
      localAddress: socket.localAddress,
      localPort: socket.localPort,
      remoteAddrees: socket.remoteAddress,
      remoteFamily: socket.remoteFamily,
      remotePort: socket.remotePort,
      bytesWritten: socket.bytesWritten,
    };
    console.log('[Server] socketData:' + JSON.stringify(socketData));

    socket.on('data', (data) => {
      console.log(
        '[Server] Recived data: ' +
          JSON.stringify({
            data: data.toString(),
            adress: { ...tcpServer.address() },
          })
      );

      // socket.end();
    });

    socket.on('error', (error) => {
      console.log('[Server:socket:error] ' + error);
    });

    socket.on('end', () => {
      console.log(
        '[Server:socket] connection endded, sumary:' +
          JSON.stringify({
            bytesRead: socket.bytesRead,
            bytesWritten: socket.bytesWritten,
          })
      );
    });
  })
  .on('listening', () => {
    console.log(
      '[Server] tcpServer listenning, ' + JSON.stringify(tcpServer.address())
    );
  })
  .on('close', () => {
    console.log(
      '[Server:close] connection endded, sumary:' +
        { bytesRead: socket.bytesRead, bytesWritten: socket.bytesWritten }
    );
  })
  .on('error', (error) => {
    console.log('[Server:error] ' + error);
  })
  .listen(settings.tcpServerPort, settings.tcpServerHostName);
