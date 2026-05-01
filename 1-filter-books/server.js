const express = require('express');
const app = express();
const port = 3001;

const books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925 },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
    { id: 3, title: "1984", author: "George Orwell", year: 1949 },
    { id: 4, title: "Animal Farm", author: "George Orwell", year: 1945 }
];

app.get('/books', (req, res) => {
    let result = books;
    const { author, year } = req.query;

    if (author) {
        result = result.filter(b => b.author.toLowerCase().includes(author.toLowerCase()));
    }
    
    if (year) {
        result = result.filter(b => b.year === parseInt(year, 10));
    }

    res.json(result);
});

app.listen(port, () => {
    console.log(`Exercise 1 server running at http://localhost:${port}`);
});
