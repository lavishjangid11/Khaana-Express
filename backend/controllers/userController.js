//Register User

import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Helper: create JWT token
const createToken = (userId) => {
    const secret = process.env.JWT_SECRET || 'devsecret';
    return jwt.sign({ id: userId }, secret, { expiresIn: '7d' });
}

// Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const token = createToken(user._id);
        return res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) {
        console.error('loginUser error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}

// Register User
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Name, email and password are required' });
        }

        const exists = await userModel.findOne({ email: email });
        if (exists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // validating email format and basic password length
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email format' });
        }

        if (typeof password !== 'string' || password.length < 8) {
            return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long' });
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
        });
        await newUser.save();
        const token = createToken(newUser._id);
        return res.status(201).json({ success: true, token, user: { id: newUser._id, name: newUser.name, email: newUser.email } });
    } catch (error) {
        console.error('registerUser error:', error);
        return res.status(500).json({ success: false, message: 'Error while registering user' });
    }
}

export { loginUser, registerUser }