import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 8001;
const currentFile = fileURLToPath(import.meta.url);
const currentFolder = path.dirname(currentFile);
const booksPath = path.join(currentFolder, "books.json");
const authorsPath = path.join(currentFolder, "authors.json");

app.use(express.json());

function loadList(filePath) {
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const fileData = fs.readFileSync(filePath, "utf-8");
  return fileData ? JSON.parse(fileData) : [];
}

function saveList(filePath, collection) {
  fs.writeFileSync(filePath, JSON.stringify(collection, null, 2));
}

function getNextId(collection) {
  const highestId = collection.reduce((largest, item) => Math.max(largest, item.id), 0);
  return highestId + 1;
}

function validateYear(req, res, next) {
  const selectedYear = req.body?.year ?? req.query.year;

  if (selectedYear === undefined) {
    return next();
  }

  const parsedYear = Number(selectedYear);
  const presentYear = new Date().getFullYear();

  if (!Number.isInteger(parsedYear) || parsedYear < 1400 || parsedYear > presentYear + 1) {
    return res.status(400).json({ message: "Year must be a valid number from 1400 to next year" });
  }

  if (req.body?.year !== undefined) {
    req.body.year = parsedYear;
  }

  if (req.query.year !== undefined) {
    req.query.year = String(parsedYear);
  }

  next();
}

function paginateResults(items, pageValue, limitValue) {
  const page = Math.max(Number.parseInt(pageValue, 10) || 1, 1);
  const limit = Math.max(Number.parseInt(limitValue, 10) || 10, 1);
  const start = (page - 1) * limit;
  const records = items.slice(start, start + limit);

  return {
    page,
    limit,
    totalItems: items.length,
    totalPages: Math.ceil(items.length / limit),
    records
  };
}

app.get("/", (req, res) => {
  res.json({ message: "RESTFUL library API is active" });
});

app.get("/books", validateYear, (req, res) => {
  const { author, year, page, limit } = req.query;
  const libraryBooks = loadList(booksPath);
  let matchedBooks = libraryBooks;

  if (author) {
    matchedBooks = matchedBooks.filter((book) => book.author.toLowerCase() === author.toLowerCase());
  }

  if (year) {
    matchedBooks = matchedBooks.filter((book) => book.year === Number(year));
  }

  res.json(paginateResults(matchedBooks, page, limit));
});

app.get("/books/search", (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ message: "Title query is required" });
  }

  const libraryBooks = loadList(booksPath);
  const matchedBooks = libraryBooks.filter((book) =>
    book.title.toLowerCase().includes(title.toLowerCase())
  );

  res.json(matchedBooks);
});

app.get("/books/:id", (req, res) => {
  const libraryBooks = loadList(booksPath);
  const book = libraryBooks.find((item) => item.id === Number(req.params.id));

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json(book);
});

app.post("/books", validateYear, (req, res) => {
  const { title, author, year } = req.body;

  if (!title || !author || !year) {
    return res.status(400).json({ message: "Title, author and year are required" });
  }

  const libraryBooks = loadList(booksPath);
  const bookExists = libraryBooks.some(
    (book) => book.title.toLowerCase() === title.toLowerCase() && book.author.toLowerCase() === author.toLowerCase()
  );

  if (bookExists) {
    return res.status(409).json({ message: "Book already exists" });
  }

  const newBook = {
    id: getNextId(libraryBooks),
    title,
    author,
    year
  };

  libraryBooks.push(newBook);
  saveList(booksPath, libraryBooks);
  res.status(201).json(newBook);
});

app.put("/books/:id", validateYear, (req, res) => {
  const { title, author, year } = req.body;
  const libraryBooks = loadList(booksPath);
  const bookIndex = libraryBooks.findIndex((book) => book.id === Number(req.params.id));

  if (bookIndex === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  libraryBooks[bookIndex] = {
    ...libraryBooks[bookIndex],
    title: title ?? libraryBooks[bookIndex].title,
    author: author ?? libraryBooks[bookIndex].author,
    year: year ?? libraryBooks[bookIndex].year
  };

  saveList(booksPath, libraryBooks);
  res.json(libraryBooks[bookIndex]);
});

app.delete("/books/:id", (req, res) => {
  const libraryBooks = loadList(booksPath);
  const bookIndex = libraryBooks.findIndex((book) => book.id === Number(req.params.id));

  if (bookIndex === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  const [removedBook] = libraryBooks.splice(bookIndex, 1);
  saveList(booksPath, libraryBooks);
  res.json(removedBook);
});

app.get("/authors", (req, res) => {
  res.json(loadList(authorsPath));
});

app.get("/authors/:id", (req, res) => {
  const writers = loadList(authorsPath);
  const writer = writers.find((author) => author.id === Number(req.params.id));

  if (!writer) {
    return res.status(404).json({ message: "Author not found" });
  }

  res.json(writer);
});

app.post("/authors", (req, res) => {
  const { name, country, activeSince } = req.body;

  if (!name || !country || !activeSince) {
    return res.status(400).json({ message: "Name, country and activeSince are required" });
  }

  const writers = loadList(authorsPath);
  const authorExists = writers.some((author) => author.name.toLowerCase() === name.toLowerCase());

  if (authorExists) {
    return res.status(409).json({ message: "Author already exists" });
  }

  const newAuthor = {
    id: getNextId(writers),
    name,
    country,
    activeSince: Number(activeSince)
  };

  writers.push(newAuthor);
  saveList(authorsPath, writers);
  res.status(201).json(newAuthor);
});

app.put("/authors/:id", (req, res) => {
  const { name, country, activeSince } = req.body;
  const writers = loadList(authorsPath);
  const authorIndex = writers.findIndex((author) => author.id === Number(req.params.id));

  if (authorIndex === -1) {
    return res.status(404).json({ message: "Author not found" });
  }

  writers[authorIndex] = {
    ...writers[authorIndex],
    name: name ?? writers[authorIndex].name,
    country: country ?? writers[authorIndex].country,
    activeSince: activeSince === undefined ? writers[authorIndex].activeSince : Number(activeSince)
  };

  saveList(authorsPath, writers);
  res.json(writers[authorIndex]);
});

app.delete("/authors/:id", (req, res) => {
  const writers = loadList(authorsPath);
  const authorIndex = writers.findIndex((author) => author.id === Number(req.params.id));

  if (authorIndex === -1) {
    return res.status(404).json({ message: "Author not found" });
  }

  const [removedAuthor] = writers.splice(authorIndex, 1);
  saveList(authorsPath, writers);
  res.json(removedAuthor);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
