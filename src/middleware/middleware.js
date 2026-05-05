import joi from "joi";
import rateLimit from "express-rate-limit";

export const validateRegistration = (req, res, next) => {
    const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).required(),
        role: joi.string().valid("Admin", "User")
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    next();
};

export const validatePost = (req, res, next) => {
    const schema = joi.object({
        title: joi.string().required(),
        content: joi.string().required(),
        tags: joi.array().items(joi.string())
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    next();
};

export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests, please try again later."
});
