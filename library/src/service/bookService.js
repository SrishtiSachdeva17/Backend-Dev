import { StatusCodes } from "http-status-pro-js";
import Book from "../model/book_schema.js";

function createError(status, message) {
    const error = new Error(message);
    error.status = status;
    return error;
}

export async function createBook(title, author, price) {
    return Book.create({
        title,
        author,
        price
    });
}

export async function bookupdate(bookId, price) {
    const book = await Book.findByIdAndUpdate(
        bookId,
        { price },
        { new: true, runValidators: true }
    );

    if (!book) {
        throw createError(StatusCodes.NOT_FOUND.code, "Book not found");
    }

    return book;
}
