const express = require('express');
const app = express();
const port = 3005;

const books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925 },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
    { id: 3, title: "1984", author: "George Orwell", year: 1949 },
    { id: 4, title: "Animal Farm", author: "George Orwell", year: 1945 },
    { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger", year: 1951 }
];

app.get('/books/search', (req, res) => {
    const { title } = req.query;
    
    if (!title) {
        return res.status(400).json({ error: "Title query parameter is required for searching" });
    }

    const results = books.filter(b => b.title.toLowerCase().includes(title.toLowerCase()));
    
    res.json(results);
});

app.listen(port, () => {
    console.log(`Exercise 5 server running at http://localhost:${port}`);
});
