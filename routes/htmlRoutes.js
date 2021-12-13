const html = require('express').Router();
const path = require('path');

// GET Route for notes
html.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/notes.html'))
);

// GET Route for homepage
html.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/index.html'))
);

// Wildcard route to direct users back to homepage
html.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/index.html'))
);

module.exports = html;