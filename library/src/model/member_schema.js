import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            sparse: true
        },
        password: {
            type: String
        },
        membershipType: {
            type: String,
            required: true,
            enum: ["Normal", "Gold"],
            default: "Normal"
        }
    },
    {
        timestamps: true
    }
);

memberSchema.methods.toJSON = function toJSON() {
    const member = this.toObject();
    delete member.password;
    return member;
};

const Member = mongoose.models.Member || mongoose.model("Member", memberSchema);

export default Member;
