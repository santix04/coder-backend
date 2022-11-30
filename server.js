const express = require('express');
const Container = require('./contenedor');
const app = express();
const PORT = 8080;


const server = app.listen(PORT, () => {
  console.log(`Listening app port ${server.address().port}`);
});


server.on('error', (error) => {
  console.log('Error', error);
});

const products = new Container('./productos.json')

app.get('/productos', async (req, res) => {
  const productos = await products.getAll();
  res.send(productos);
});


app.get('/productoRandom', async (req, res) => {
  const productos = await products.getAll();
  let numeroRandom = Math.floor(Math.random() * productos.length);
  res.send(productos[numeroRandom]);
});
