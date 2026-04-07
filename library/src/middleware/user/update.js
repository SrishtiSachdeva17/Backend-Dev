import joi from "joi";
import { StatusCodes } from "http-status-pro-js";

function update(req, res, next) {
    try {
        const schema = joi.object({
            id: joi.string().trim().length(24).required(),
            name: joi.string().trim().min(3).max(200),
            membershipType: joi.string().valid("Normal", "Gold"),
            email: joi.string().trim().email().lowercase().min(6).max(200),
            password: joi.string().trim().min(4).max(32)
        }).min(2);
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
        console.log("login mid", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR.code,
            message: StatusCodes.INTERNAL_SERVER_ERROR.message,
            data: null
        });
        return;
    }
}
export default update;
