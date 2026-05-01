const express = require('express');
const app = express();
const port = 3002;

const responseTimeLogger = (req, res, next) => {
    const start = Date.now();
    
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${duration}ms`);
    });

    next();
};

app.use(responseTimeLogger);

app.get('/', (req, res) => {
    res.send('<h1>Middleware Logger</h1><p>Check your console to see the response time log for this request.</p>');
});

app.get('/slow', (req, res) => {
    setTimeout(() => {
        res.send('<h1>Slow Page</h1><p>This page took about 1 second to load.</p>');
    }, 1000);
});

app.listen(port, () => {
    console.log(`Exercise 2 server running at http://localhost:${port}`);
});
