import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-pro-js";
import dotenv from "dotenv";
dotenv.config();

function auth(req, res, next) {
    try {
        const authorization = req.headers.authorization;
        if (!authorization || !authorization.startsWith("Bearer ")) {
            res.status(StatusCodes.UNAUTHORIZED.code).json({
                code: StatusCodes.UNAUTHORIZED.code,
                message: "Authorization header must be a Bearer token",
                data: null
            });
            return;
        }

        const token = authorization.split(" ")[1];
        const userData = jwt.verify(token, process.env.TOKEN || "library-secret");
        req.user = userData.id;
        next();
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED.code).json({
            code: StatusCodes.UNAUTHORIZED.code,
            message: "Invalid or expired token",
            data: null
        });
    }
}
export default auth;
