const fs = require('fs');

function countStudents(ruta) {
  return new Promise((resolve, reject) => {
    fs.readFile(ruta, 'utf-8', (error, data) => {
      if (error) {
        reject(new Error('Cannot load the database'));
      } else {
        const filas = data.split('\n');
        const datos = filas.slice(1).map((fila) => fila.split(','));

        console.log(`Number of students: ${datos.length}`);

        const campos = {};

        for (const info of datos) {
          const [nombre, , , campus] = info.map((valor) => valor.trim());
          if (!campos[campus]) {
            campos[campus] = [];
          }
          campos[campus].push(nombre);
        }
        for (const [clave, valor] of Object.entries(campos)) {
          console.log(`Number of students in ${clave}: ${valor.length}. List: ${valor.join(', ')}`);
        }
        resolve();
      }
    });
  });
}

module.exports = countStudents;
