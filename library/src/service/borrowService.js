import { StatusCodes } from "http-status-pro-js";
import BorrowRecord from "../model/borrow_record_schema.js";
import Book from "../model/book_schema.js";
import Member from "../model/member_schema.js";

function createError(status, message) {
    const error = new Error(message);
    error.status = status;
    return error;
}

function calculateFine(totalValue, membershipType) {
    const baseFine = totalValue * 0.1;
    const discountRate = membershipType === "Gold" ? 0.15 : 0.05;
    const discountAmount = baseFine * discountRate;

    return {
        baseFine,
        discountRate,
        discountAmount,
        finalFine: Number((baseFine - discountAmount).toFixed(2))
    };
}

export async function createBorrowRecord(memberId, bookIds) {
    const member = await Member.findById(memberId);
    if (!member) {
        throw createError(StatusCodes.NOT_FOUND.code, "Member not found");
    }

    const books = await Book.find({ _id: { $in: bookIds } });
    if (books.length !== bookIds.length) {
        throw createError(StatusCodes.NOT_FOUND.code, "One or more books were not found");
    }

    const record = await BorrowRecord.create({
        member: memberId,
        books: bookIds
    });

    const totalValue = books.reduce((sum, book) => sum + book.price, 0);
    const fine = calculateFine(totalValue, member.membershipType);

    return {
        record,
        totalValue,
        ...fine
    };
}

export async function getBorrowingSummary(borrowRecordId) {
    const record = await BorrowRecord.findById(borrowRecordId)
        .populate("member")
        .populate("books");

    if (!record) {
        throw createError(StatusCodes.NOT_FOUND.code, "Borrow record not found");
    }

    const totalValue = record.books.reduce((sum, book) => sum + book.price, 0);
    const fine = calculateFine(totalValue, record.member.membershipType);

    return {
        borrowId: record._id,
        member: {
            id: record.member._id,
            name: record.member.name,
            membershipType: record.member.membershipType
        },
        books: record.books.map((book) => ({
            id: book._id,
            title: book.title,
            author: book.author,
            price: book.price
        })),
        totalValue,
        ...fine,
        borrowedAt: record.createdAt
    };
}
