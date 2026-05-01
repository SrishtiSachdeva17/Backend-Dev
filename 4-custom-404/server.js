const express = require('express');
const path = require('path');
const app = express();
const port = 3004;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.send('<h1>Home Page</h1><p>Try visiting a <a href="/random-route">random route</a> to see the 404 page.</p>');
});

app.get('/about', (req, res) => {
    res.send('<h1>About Page</h1><p>This is a valid page.</p>');
});

app.use((req, res, next) => {
    res.status(404).render('404', { 
        url: req.originalUrl 
    });
});

app.listen(port, () => {
    console.log(`Exercise 4 server running at http://localhost:${port}`);
});
