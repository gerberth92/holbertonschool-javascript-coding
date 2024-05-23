#!/usr/bin/node

const request = require('request');
const url = process.argv[2];
const id = 'https://swapi-api.hbtn.io/api/people/18/';
let contador = 0;

request.get(url, (error, response, data) => {
  if (error) {
    console.error(error);
  } else if (response.statusCode !== 200) {
    console.log('code:', response.statusCode);
  } else {
    const obj = JSON.parse(data);
    const re = obj.results;

    for (const dic of re) {
      const personajes = dic.characters;

      for (const per of personajes) {
        if (id === per) {
          contador += 1;
        }
      }
    }
    console.log(contador);
  }
});
