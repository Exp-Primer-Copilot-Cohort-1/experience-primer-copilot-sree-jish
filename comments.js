// Create a web server
// GET /comments - returns all comments
// POST /comments - add a new comment
// DELETE /comments/:id - delete a comment
// PUT /comments/:id - update a comment

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const comments = [
    {id: 1, body: 'first comment'},
    {id: 2, body: 'second comment'},
    {id: 3, body: 'third comment'}
];

// GET /comments - returns all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// POST /comments - add a new comment
app.post('/comments', (req, res) => {
    const comment = req.body;
    comment.id = comments.length + 1;
    comments.push(comment);
    res.json(comment);
});

// DELETE /comments/:id - delete a comment
app.delete('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = comments.findIndex(comment => comment.id === id);
    comments.splice(index, 1);
    res.json({deleted: true});
});

// PUT /comments/:id - update a comment
app.put('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const comment = req.body;
    const index = comments.findIndex(comment => comment.id === id);
    comments[index] = comment;
    res.json(comment);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});