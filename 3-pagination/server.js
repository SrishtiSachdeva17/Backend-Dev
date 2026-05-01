const express = require('express');
const app = express();
const port = 3003;

const books = Array.from({ length: 55 }, (_, i) => ({
    id: i + 1,
    title: `Book Title ${i + 1}`,
    author: `Author ${Math.ceil((i + 1) / 5)}`,
    year: 1990 + (i % 30)
}));

app.get('/books', (req, res) => {
    let { page, limit } = req.query;
    
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);
    
    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 10;
    
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const results = {};
    
    if (endIndex < books.length) {
        results.next = {
            page: page + 1,
            limit: limit
        };
    }
    
    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        };
    }
    
    results.total = books.length;
    results.results = books.slice(startIndex, endIndex);
    
    res.json(results);
});

app.listen(port, () => {
    console.log(`Exercise 3 server running at http://localhost:${port}`);
});
