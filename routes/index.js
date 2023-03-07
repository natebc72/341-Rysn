const routes = require('express').Router();
const express = require('express');


routes.get('/', (req, res) => {
  res.send('Working');
});

module.exports = routes;