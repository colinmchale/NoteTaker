const api = require('express').Router();

const db = require ('../db/db.json');


api.get('/notes', (req, res) => {
    db.getNotes().then((notes) => res.json(notes))
})


api.post('/notes', (req, res) => {
    db.saveNote(req.body).then((notes) => res.json(notes))
})

api.delete('/notes/:id', (req, res) => {
    db.deleteNote().then((notes) => res.json(notes))
})

module.exports = api;