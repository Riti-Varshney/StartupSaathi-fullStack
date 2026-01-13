import User from '../model/userModel.js';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import { genToken, genToken1 } from '../config/token.js';

export const registration = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({ message: "user already exist" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "invalid email" });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "password must be at least 8 characters" });
        }
        let hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashPassword, role });
        let token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    }
    catch (error) {
        console.error("registration error");
        return res.status(500).json({ message: `registration error ${error}` });
    }
}
export const login = async (req, res) => {
    try {
        let { email, password } = req.body; 
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "user does not exist" });
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "invalid password" });
        }
        let token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.status(201).json({
            message: "User login successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error("login error");
        return res.status(500).json({ message: `login error ${error}` });
    }
}
export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "logout successfully" });
    } catch (error) {
        console.error("logout error");
        return res.status(500).json({ message: `logout error ${error}` });
    }
}