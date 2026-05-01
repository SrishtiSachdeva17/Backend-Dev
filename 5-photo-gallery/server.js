const express = require('express');
const path = require('path');
const app = express();
const port = 3005;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

const images = [
    { src: '/images/image1.jpg', alt: 'Random Image 1', title: 'Mountain View' },
    { src: '/images/image2.jpg', alt: 'Random Image 2', title: 'Ocean Waves' },
    { src: '/images/image3.jpg', alt: 'Random Image 3', title: 'Forest Trail' }
];

app.get('/', (req, res) => {
    res.render('gallery', { images });
});

app.listen(port, () => {
    console.log(`Exercise 5 server running at http://localhost:${port}`);
});
