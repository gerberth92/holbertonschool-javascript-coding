#!/usr/bin/node

const request = require('request');
const id = process.argv[2];
const url = `https://swapi-api.hbtn.io/api/films/${id}`;

request.get(url, (error, response, data) => {
  if (error) {
    console.error(error);
  } else if (response.statusCode !== 200) {
    console.log('code:', error);
  } else {
    const obj = JSON.parse(data);
    console.log(obj.title);
  }
});
