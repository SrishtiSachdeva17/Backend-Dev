import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/userSchema.js";

const JWT_SECRET = process.env.JWT_SECRET || "secret";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh_secret";

export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        
        const passwordHash = await bcrypt.hash(password, 10);
        
        const user = await User.create({ 
            name: name, 
            email: email, 
            passwordHash: passwordHash, 
            role: role 
        });
        
        return res.status(201).json({ 
            message: "User registered successfully", 
            userId: user._id 
        });
    } catch (error) {
        return res.status(500).json({ error: "Registration failed, please try again." });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email: email });
        
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        
        const accessToken = jwt.sign(
            { id: user._id, role: user.role }, 
            JWT_SECRET, 
            { expiresIn: "15m" }
        );
        
        const refreshToken = jwt.sign(
            { id: user._id, role: user.role }, 
            JWT_REFRESH_SECRET, 
            { expiresIn: "7d" }
        );
        
        return res.status(200).json({ 
            accessToken: accessToken, 
            refreshToken: refreshToken 
        });
    } catch (error) {
        return res.status(500).json({ error: "Login failed, please try again." });
    }
};

export const refreshToken = (req, res) => {
    try {
        const { token } = req.body;
        
        if (!token) {
            return res.status(401).json({ error: "Token is required" });
        }
        
        const decodedToken = jwt.verify(token, JWT_REFRESH_SECRET);
    
        const newAccessToken = jwt.sign(
            { id: decodedToken.id, role: decodedToken.role }, 
            JWT_SECRET, 
            { expiresIn: "15m" }
        );
        
        return res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
        return res.status(401).json({ error: "Invalid refresh token" });
    }
};
