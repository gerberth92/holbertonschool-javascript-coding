import readDatabase from '../utils';

export default class StudentsController {
  static getAllStudents(request, response) {
    readDatabase(process.argv[2])
      .then((data) => {
        let mensaje = 'This is the list of our students\n';

        for (const [clave, valor] of Object.entries(data)) {
          mensaje += `Number of students in ${clave}: ${valor.length}. List: ${valor.join(', ')}\n`;
        }

        // response.setHeader('content-Type', 'text/plain');
        return response.status(200).send(mensaje);
      })
      .catch((error) => {
        console.error(error, 'Cannot load the database');
        return response.status(500).send('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(request, response) {
    const { major } = request.params;

    if (major !== 'CS' && major !== 'SWE') {
      response.status(500).send('Major parameter must be CS or SWE');
    } else {
      readDatabase(process.argv[2])
        .then((data) => {
          response.status(200).send(`List: ${data[major].join(', ')}`);
        })
        .catch((error) => {
          console.error(error, 'Cannot load the database');
          response.status(500).send('Cannot load the database');
        });
    }
  }
}
