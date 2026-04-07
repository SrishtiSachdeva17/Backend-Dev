import {
    createBorrowRecord,
    getBorrowingSummary as fetchBorrowingSummary
} from "../service/borrowService.js";

async function borrow(memberId, bookIds) {
    return createBorrowRecord(memberId, bookIds);
}

async function getBorrowingSummary(borrowRecordId) {
    return fetchBorrowingSummary(borrowRecordId);
}

export { borrow, getBorrowingSummary };
