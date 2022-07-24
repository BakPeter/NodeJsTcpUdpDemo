const net = require('net');

const settings = require('./appsettings.json');
console.log('[Client]' + JSON.stringify(settings));

const socket = new net.Socket();

socket.on('data', (data) => {
  console.log('[Client] Recived data: ' + data.toString());
});

socket.on('end', () => {
  console.log(
    '[Client:end] connection endded, sumary:' +
      JSON.stringify({
        bytesRead: socket.bytesRead,
        bytesWritten: socket.bytesWritten,
      })
  );
});

socket.on('error', (error) => {
  console.log('[Client:error] Error, error:' + error);
});

socket.on('close', (hadError) => {
  console.log('[Client:close] Haderror:' + hadError);
});

socket.connect(
  {
    port: settings.tcpServerPort,
    host: settings.tcpServerHostName,
    family: settings.tcpServerFamilyNum,
  },
  () => {
    socket.write(
      '[Client] Connected to server, ' + JSON.stringify({ ...socket.address() })
    );
  }
);
