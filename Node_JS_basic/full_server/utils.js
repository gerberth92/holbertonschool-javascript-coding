import fs from 'fs';

export default function readDatabase(ruta) {
  return new Promise((resolve, reject) => {
    fs.readFile(ruta, 'utf-8', (error, data) => {
      if (error) {
        reject(new Error(error));
      } else {
        const filas = data.split('\n');
        const datos = filas.slice(1).map((dato) => dato.trim().split(','));
        const di = {};

        for (const info of datos) {
          const [nombre, , , campus] = info.map((v) => v.trim());
          if (!di[campus]) {
            di[campus] = [];
          }
          di[campus].push(nombre);
        }
        resolve(di);
      }
    });
  });
}
