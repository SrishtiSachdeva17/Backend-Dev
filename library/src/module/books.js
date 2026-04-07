import { createBook } from "../service/bookService.js";

async function addBook(title, author, price) {
    return createBook(title, author, price);
}

export default addBook;
