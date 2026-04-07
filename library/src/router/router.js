import express from "express";
import signup from "../middleware/user/signup.js";
import auth from "../auth/auth.js";
import signupService, { loginMember } from "../service/memberService.js";
import login from "../middleware/user/login.js";
import { registerBooks } from "../middleware/books/book_midd.js";
import addBook from "../module/books.js";
import addMember from "../module/members.js";
import { borrow, getBorrowingSummary } from "../module/borrowedRecord.js";

const router = express.Router();

function sendError(res, error) {
    res.status(error.status || 500).json({
        code: error.status || 500,
        message: error.message || "Internal server error",
        data: null
    });
}

router.post("/signup", signup, signupService);
router.post("/login", login, loginMember);

// Library routes
router.post("/books", auth, registerBooks, async (req, res) => {
    try {
        const { title, author, price } = req.body;
        const book = await addBook(title, author, price);
        res.status(201).json({
            code: 201,
            message: "Book created successfully",
            data: book
        });
    } catch (error) {
        sendError(res, error);
    }
});

router.post("/members", auth, async (req, res) => {
    try {
        const { name, membershipType } = req.body;
        const member = await addMember(name, membershipType);
        res.status(201).json({
            code: 201,
            message: "Member created successfully",
            data: member
        });
    } catch (error) {
        sendError(res, error);
    }
});

router.post("/borrow", auth, async (req, res) => {
    try {
        const { memberId, bookIds } = req.body;
        if (!memberId || !Array.isArray(bookIds) || bookIds.length === 0) {
            res.status(400).json({
                code: 400,
                message: "memberId and at least one bookId are required",
                data: null
            });
            return;
        }
        const borrowRecord = await borrow(memberId, bookIds);
        res.status(201).json({
            code: 201,
            message: "Books borrowed successfully",
            data: borrowRecord
        });
    } catch (error) {
        sendError(res, error);
    }
});

router.get("/summary/:borrowId", auth, async (req, res) => {
    try {
        const { borrowId } = req.params;
        const summary = await getBorrowingSummary(borrowId);
        res.json({
            code: 200,
            message: "Borrowing summary fetched successfully",
            data: summary
        });
    } catch (error) {
        sendError(res, error);
    }
});

export default router;
