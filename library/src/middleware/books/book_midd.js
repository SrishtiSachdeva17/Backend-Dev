import joi from "joi";
import { StatusCodes } from "http-status-pro-js";

export function registerBooks(req, res, next) {
    try {
        const schema = joi.object({
            title: joi.string().trim().min(3).max(200).required(),
            author: joi.string().trim().min(2).max(200).required(),
            price: joi.number().min(0).max(1000).required()
        });
        const { error, value } = schema.validate(req.body);
        if (error) {
            res.status(StatusCodes.BAD_REQUEST.code).json({
                code: StatusCodes.BAD_REQUEST.code,
                message: error.details[0].message,
                data: null
            });
            return;
        }
        req.body = value;
        next();
    } catch (error) {
        console.log("books_midd", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR.code,
            message: StatusCodes.INTERNAL_SERVER_ERROR.message,
            data: null
        });
        return;
    }
}

export function bookupdate(req, res, next) {
    try {
        const schema = joi.object({
            book_id: joi.string().trim().length(24).required(),
            price: joi.number().min(0).max(1000).required()
        });
        const { error, value } = schema.validate(req.body);
        if (error) {
            res.status(StatusCodes.BAD_REQUEST.code).json({
                code: StatusCodes.BAD_REQUEST.code,
                message: error.details[0].message,
                data: null
            });
            return;
        }
        req.body = value;
        next();
    } catch (error) {
        console.log("book mid", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR.code,
            message: StatusCodes.INTERNAL_SERVER_ERROR.message,
            data: null
        });
        return;
    }
}
