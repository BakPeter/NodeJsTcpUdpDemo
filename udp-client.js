const dgram = require('dgram');

const settings = require('./appsettings.json');

const message = Buffer.from('Helo from client');
const client = dgram.createSocket(settings.udpSocketType);

client.send(
  message,
  settings.udpServerPort,
  settings.udpserverHost,
  (error) => {
    if (error) {
      console.log('Error: ' + error);
      client.close();
    }
  }
);
