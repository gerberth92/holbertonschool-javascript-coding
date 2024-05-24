#!/usr/bin/node

const request = require('request');
const url = process.argv[2];
const di = {};

request.get(url, (error, response, data) => {
  if (error) {
    console.error(error);
  } else if (response.statusCode !== 200) {
    console.log('code:', response.statusCode);
  } else {
    const info = JSON.parse(data);

    for (const obj of info) {
      if (obj.completed === true) {
        if (di[obj.userId]) {
          di[obj.userId] += 1;
        } else {
          di[obj.userId] = 1;
        }
      }
    }
    console.log(di);
  }
});
