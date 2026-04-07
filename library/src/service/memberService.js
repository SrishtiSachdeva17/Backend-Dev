import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { StatusCodes } from "http-status-pro-js";
import Member from "../model/member_schema.js";

dotenv.config();

function createError(status, message) {
    const error = new Error(message);
    error.status = status;
    return error;
}

function normalizeMembershipType(membershipType) {
    if (!membershipType) {
        return "Normal";
    }

    return membershipType.toLowerCase() === "gold" ? "Gold" : "Normal";
}

function formatMember(member) {
    return {
        id: member._id,
        name: member.name,
        email: member.email ?? null,
        membershipType: member.membershipType,
        createdAt: member.createdAt,
        updatedAt: member.updatedAt
    };
}

export async function createMember(name, membershipType = "Normal", email, password) {
    const normalizedEmail = email?.trim().toLowerCase();

    if (normalizedEmail) {
        const existingMember = await Member.findOne({ email: normalizedEmail });
        if (existingMember) {
            throw createError(StatusCodes.BAD_REQUEST.code, "Email already exists");
        }
    }

    const member = new Member({
        name,
        email: normalizedEmail,
        password: password ? await bcrypt.hash(password, 10) : undefined,
        membershipType: normalizeMembershipType(membershipType)
    });

    await member.save();
    return member;
}

export async function userupdate(id, name, membershipType) {
    const user = await Member.findByIdAndUpdate(
        id,
        {
            name,
            membershipType: normalizeMembershipType(membershipType)
        },
        { new: true, runValidators: true }
    );

    if (!user) {
        throw createError(StatusCodes.NOT_FOUND.code, "Member not found");
    }

    return user;
}

export async function deleteuser(id) {
    const user = await Member.findByIdAndDelete(id);
    if (!user) {
        throw createError(StatusCodes.NOT_FOUND.code, "Member not found");
    }

    return "user deleted";
}

export async function loginMember(req, res) {
    try {
        const { email, password } = req.body;
        const member = await Member.findOne({ email: email.trim().toLowerCase() });

        if (!member || !member.password) {
            res.status(StatusCodes.UNAUTHORIZED.code).json({
                code: StatusCodes.UNAUTHORIZED.code,
                message: "Invalid credentials",
                data: null
            });
            return;
        }

        const isValidPassword = await bcrypt.compare(password, member.password);
        if (!isValidPassword) {
            res.status(StatusCodes.UNAUTHORIZED.code).json({
                code: StatusCodes.UNAUTHORIZED.code,
                message: "Invalid credentials",
                data: null
            });
            return;
        }

        const token = jwt.sign(
            { id: member._id, email: member.email },
            process.env.TOKEN || "library-secret",
            { expiresIn: "1h" }
        );

        res.status(StatusCodes.OK.code).json({
            code: StatusCodes.OK.code,
            message: "Login successful",
            data: {
                token,
                member: formatMember(member)
            }
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR.code,
            message: error.message,
            data: null
        });
    }
}

export default async function signupService(req, res) {
    try {
        const { name, email, password, membershipType } = req.body;
        const member = await createMember(name, membershipType, email, password);

        res.status(StatusCodes.CREATED.code).json({
            code: StatusCodes.CREATED.code,
            message: "Signup successful",
            data: formatMember(member)
        });
    } catch (error) {
        res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code: error.status || StatusCodes.INTERNAL_SERVER_ERROR.code,
            message: error.message,
            data: null
        });
    }
}
