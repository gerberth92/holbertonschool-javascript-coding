const fs = require('fs');

function countStudents(ruta) {
  fs.readFile(ruta, 'utf-8', (error, data) => {
    if (error) {
      throw new Error('Cannot load the database');
    } else {
      const filas = data.trim().split('\n');
      const datos = filas.slice(1).map((fila) => fila.split(','));

      console.log(`Number of students: ${datos.length}`);

      const campos = {};

      for (const info of datos) {
        const [nombre, , , campus] = info.map((str) => str.trim());

        if (!campos[campus]) {
          campos[campus] = [];
        }
        campos[campus].push(nombre);
      }
      for (const [clave, valor] of Object.entries(campos)) {
        console.log(`Number of students in ${clave}: ${valor.length}. List: ${valor.join(', ')}`);
      }
    }
  });
}

module.exports = countStudents;
