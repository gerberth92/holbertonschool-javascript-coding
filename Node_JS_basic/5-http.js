const http = require('http');
const fs = require('fs');

function countStudents(ruta) {
  return new Promise((resolve, reject) => {
    fs.readFile(ruta, 'utf-8', (error, data) => {
      if (error) {
        reject(new Error('Cannot load the database'));
      } else {
        const fila = data.split('\n');
        const datos = fila.slice(1).map((dato) => dato.trim().split(','));
        const mensaje = [];

        mensaje.push(`Number of students: ${datos.length}`);

        const dic = {};

        for (const info of datos) {
          const [nombre, , , campus] = info.map((valor) => valor.trim());

          if (!dic[campus]) {
            dic[campus] = [];
          }
          dic[campus].push(nombre);
        }
        for (const [clave, valor] of Object.entries(dic)) {
          mensaje.push(`Number of students in ${clave}: ${valor.length}. List: ${valor.join(', ')}`);
        }
        resolve(mensaje);
      }
    });
  });
}

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'content-Type': 'text/plain' });
  if (req.url === '/') {
    res.end('Hello Holberton School!');
  }
  if (req.url === '/students') {
    res.write('This is the list of our students\n');

    countStudents(process.argv[2])
      .then((m) => {
        res.end(m.join('\n'));
      })
      .catch((error) => {
        res.end(error.message);
      });
  }
});

const port = 1245;

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto: ${port}`);
});

module.exports = app;
