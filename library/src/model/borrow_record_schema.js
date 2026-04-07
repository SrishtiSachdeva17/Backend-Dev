import mongoose from "mongoose";

const borrowRecordSchema = new mongoose.Schema(
    {
        member: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Member",
            required: true
        },
        books: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book",
                required: true
            }
        ]
    },
    {
        timestamps: true
    }
);

const BorrowRecord =
    mongoose.models.BorrowRecord ||
    mongoose.model("BorrowRecord", borrowRecordSchema);

export default BorrowRecord;
