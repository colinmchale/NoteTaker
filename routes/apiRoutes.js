const api = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');


api.get('/notes', (req, res) => {
    console.info(`${req.method} request received for feedback`);

  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});


api.post('/notes', (req, res) => {
    // Log that a POST request was received
  console.info(`${req.method} request received to submit note`);

  console.log(req.body);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting note');
  }
});

// api.delete('/notes/:id', (req, res) => {
    
// });

module.exports = api;