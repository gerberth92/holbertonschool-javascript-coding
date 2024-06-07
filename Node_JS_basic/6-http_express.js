const express = require('express');
// const e = express();
const port = 1245;

const app = express().get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.listen(port, () => {
  console.log(`Server corriendo en el puerto: ${port}`);
});
