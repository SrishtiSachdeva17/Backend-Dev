const express = require('express');
const app = express();
const port = 3002;

const books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925 },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
    { id: 3, title: "1984", author: "George Orwell", year: 1949 },
    { id: 4, title: "Animal Farm", author: "George Orwell", year: 1945 }
];

const validateYear = (req, res, next) => {
    const { year } = req.query;
    
    if (year) {
        const parsedYear = parseInt(year, 10);
        if (isNaN(parsedYear) || parsedYear < 1000 || parsedYear > new Date().getFullYear()) {
            return res.status(400).json({ error: "Invalid year parameter. Must be a valid year between 1000 and the current year." });
        }
    }
    
    next();
};

app.get('/books', validateYear, (req, res) => {
    let result = books;
    const { year } = req.query;
    
    if (year) {
        result = result.filter(b => b.year === parseInt(year, 10));
    }

    res.json(result);
});

app.listen(port, () => {
    console.log(`Exercise 2 server running at http://localhost:${port}`);
});
