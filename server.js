const express = require('express');
const path = require('path');

const app = express();
const server = require('http').Server(app);

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

server.listen(3001,
  () => console.log('Express/Node server started on port 3001')
);
