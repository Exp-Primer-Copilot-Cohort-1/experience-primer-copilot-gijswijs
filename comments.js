// Create web server
// 1. Install express
// 2. Create server
// 3. Create route
// 4. Listen port
// 5. Install nodemon

const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/comments', (req, res) => {
    const comments = JSON.parse(fs.readFileSync('./comments.json'));
    res.send(comments);
});

app.post('/comments', (req, res) => {
    const comments = JSON.parse(fs.readFileSync('./comments.json'));
    const newComment = {
        id: uuidv4(),
        name: req.body.name,
        content: req.body.content,
        createdAt: new Date()
    };
    comments.push(newComment);
    fs.writeFileSync('./comments.json', JSON.stringify(comments));
    res.send(newComment);
});

app.delete('/comments/:id', (req, res) => {
    const comments = JSON.parse(fs.readFileSync('./comments.json'));
    const newComments = comments.filter((comment) => comment.id !== req.params.id);
    fs.writeFileSync('./comments.json', JSON.stringify(newComments));
    res.send({
        message: 'Delete comment successfully'
    });
});

app.put('/comments/:id', (req, res) => {
    const comments = JSON.parse(fs.readFileSync('./comments.json'));
    const newComments = comments.map((comment) => {
        if (comment.id === req.params.id) {
            return {
                ...comment,
                name: req.body.name,
                content: req.body.content
            };
        }
        return comment;
    });
    fs.writeFileSync('./comments.json', JSON.stringify(newComments));
    res.send({
        message: 'Update comment successfully'
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});