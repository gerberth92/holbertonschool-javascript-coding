#!/usr/bin/node

const request = require('request');
const fs = require('fs');
const url = process.argv[2];
const file = process.argv[3];

request.get(url, (error, response, data) => {
  if (error) {
    console.error(error);
  } else if (response.statusCode !== 200) {
    console.log('code:', request.statusCode);
  } else {
    fs.writeFile(file, data, 'utf-8', (error) => {
      if (error) {
        console.error(error);
      }
    });
  }
});
