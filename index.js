const express = require('express');
const http = require('http');
const { WebSocketServer } = require('ws');

const app = express();

// simple HTTP route
app.get('/', (req, res) => res.send('we get it. The server works '));

// create server and attach ws
const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });

wss.on('connection', (ws) => {
  ws.on('message', msg => {
    for (const client of wss.clients) {
      client.send(msg);
    }
  })
});

// start
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`listening on ${PORT}`));

