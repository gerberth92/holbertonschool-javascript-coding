const http = require('http');

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'content-Type': 'text/plain' });
  res.end('Hello Holberton School!');
});

const port = 1245;

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto: ${port}`);
});

module.exports = app;
