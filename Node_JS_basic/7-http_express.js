const express = require('express');
const fs = require('fs');

const app = express();
const port = 1245;

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

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});
app.get('/students', (req, res) => {
  countStudents(process.argv[2])
    .then((m) => {
      res.send(`This is the list of our students\n${m.join('\n')}`);
    })
    .catch((error) => {
      console.error(error.message);
    });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto: ${port}`);
});

module.exports = app;
