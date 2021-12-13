const api = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');


api.get('/notes', (req, res) => {
    console.info(`${req.method} request received for feedback`);

  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// // To select a specific note and have it appear in center section
// api.get('/notes/:note_id', (req, res) => {
//   console.info(`${req.method} request received for feedback`);

//   const noteId = req.params.note_id;
//   readFromFile('./db/db.json')
//     .then((data) => JSON.parse(data))
//     .then((json) => {
//     // Make a new array of all tips except the one with the ID provided in the URL
//     const [result] = json.filter((note) => note.id === noteId);
//     console.log(result)
//   });
// });


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
      id: uuidv4(),
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

api.delete('/notes/:note_id', (req, res) => {
  const noteId = req.params.note_id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
    // Make a new array of all tips except the one with the ID provided in the URL
    const result = json.filter((note) => note.id !== noteId);

    console.log(noteId)
    // Save that array to the filesystem
    writeToFile('./db/db.json', result);

    // Respond to the DELETE request
    res.json(`Item ${noteId} has been deleted`);
  });
});
  
module.exports = api;