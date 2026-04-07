import joi from "joi";
import {StatusCodes} from "http-status-pro-js";

function signup(req,res,next){
    try {
        let schema = joi.object({
            name: joi.string().trim().min(3).max(200).required(),
            email: joi.string().trim().email().lowercase().min(6).max(200).required(),
            password: joi.string().trim().min(4).max(32).required(),
            membershipType: joi.string().valid("Normal", "Gold").default("Normal")
        })
        let{error,value} = schema.validate(req.body)
        if(error){
            res.status(StatusCodes.BAD_REQUEST.code).json({
                code : StatusCodes.BAD_REQUEST.code,
                message : error,
                data: null
            })
            return;
        }
        req.body = value;
        next()
        
    } catch (error) {
        console.log("user mid", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code : StatusCodes.INTERNAL_SERVER_ERROR.code,
            message : StatusCodes.INTERNAL_SERVER_ERROR.message,
            data: null
        })
        return;
    }    

}
export default signup;
