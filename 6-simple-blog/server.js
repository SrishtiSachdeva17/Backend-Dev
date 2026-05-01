const express = require('express');
const path = require('path');
const app = express();
const port = 3006;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

let posts = [
    { id: 1, title: 'Introduction to Express', content: 'Express is a fast, unopinionated, minimalist web framework for Node.js.' },
    { id: 2, title: 'Getting Started with EJS', content: 'EJS is a simple templating language that lets you generate HTML markup with plain JavaScript.' }
];
let nextId = 3;

app.get('/posts', (req, res) => {
    res.render('index', { posts });
});

app.get('/posts/new', (req, res) => {
    res.render('new');
});

app.post('/posts', (req, res) => {
    const { title, content } = req.body;
    if (title && content) {
        posts.push({ id: nextId++, title, content });
    }
    res.redirect('/posts');
});

app.get('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    if (!post) {
        return res.status(404).send('Post not found');
    }
    res.render('post', { post });
});

app.get('/', (req, res) => {
    res.redirect('/posts');
});

app.listen(port, () => {
    console.log(`Exercise 6 server running at http://localhost:${port}`);
});
