const express = require('express');
const path = require('path');
const app = express();
const port = 3003;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('contact');
});

app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;
    
    console.log('Received contact submission:');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);

    res.render('success', { name, email });
});

app.listen(port, () => {
    console.log(`Exercise 3 server running at http://localhost:${port}`);
});
