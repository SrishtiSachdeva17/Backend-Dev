const express = require('express');
const app = express();
const port = 3004;

app.use(express.json());

let authors = [
    { id: 1, name: "J.K. Rowling", nationality: "British" },
    { id: 2, name: "George R.R. Martin", nationality: "American" }
];
let nextId = 3;

app.get('/authors', (req, res) => {
    res.json(authors);
});

app.get('/authors/:id', (req, res) => {
    const author = authors.find(a => a.id === parseInt(req.params.id, 10));
    if (!author) {
        return res.status(404).json({ error: "Author not found" });
    }
    res.json(author);
});

app.post('/authors', (req, res) => {
    const { name, nationality } = req.body;
    if (!name || !nationality) {
        return res.status(400).json({ error: "Name and nationality are required" });
    }
    const newAuthor = { id: nextId++, name, nationality };
    authors.push(newAuthor);
    res.status(201).json(newAuthor);
});

app.put('/authors/:id', (req, res) => {
    const author = authors.find(a => a.id === parseInt(req.params.id, 10));
    if (!author) {
        return res.status(404).json({ error: "Author not found" });
    }
    const { name, nationality } = req.body;
    if (name) author.name = name;
    if (nationality) author.nationality = nationality;
    res.json(author);
});

app.delete('/authors/:id', (req, res) => {
    const authorIndex = authors.findIndex(a => a.id === parseInt(req.params.id, 10));
    if (authorIndex === -1) {
        return res.status(404).json({ error: "Author not found" });
    }
    const deletedAuthor = authors.splice(authorIndex, 1);
    res.json(deletedAuthor[0]);
});

app.listen(port, () => {
    console.log(`Exercise 4 server running at http://localhost:${port}`);
});
