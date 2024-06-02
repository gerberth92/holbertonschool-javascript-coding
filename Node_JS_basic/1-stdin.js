const redline = require('readline');

const rl = redline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Welcome to Holberton School, what is your name?\n', (nombre) => {
  console.log(`Your name is: ${nombre}`);
  console.log('This important software is now closing');
  rl.close();
});
