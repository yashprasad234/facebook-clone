import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { user } from "../models/user";

export const router = express.Router();
// AUTH routes

// REGISTER
router.post("/singup", async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        try {
            const userExists = await user.findOne({ email });
            if (userExists) {
                res.status(403).json({ msg: "User with this email already exists" });
            } else {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                const newUser = new user({
                    fullname,
                    email,
                    password: hashedPassword,
                });
                const savedUser = await newUser.save();
                res.json({ msg: "User created successfully", userId: savedUser._id });
            }
        }
        catch (err) {
            res.status(500).json({ msg: "Error connecting to DB" })
        }
    } catch (err) {
        console.error(err);
    }
});

// LOGIN
router.post("/singin", async (req, res) => {
    try {
        const { email, password } = req.body;
        try {
            // check if user exists
            const userExists = await user.findOne({ email });
            if (userExists) {
                const validPassword = await bcrypt.compare(
                    req.body.password,
                    userExists.password
                );
                if (validPassword) {
                    // check if password and email match
                    const token = jwt.sign({ userId: userExists._id }, "SECRET", { expiresIn: "1h" });
                    res.json({ msg: "Signed in successfully", token });
                } else {
                    // if password does not match
                    res.status(404).json({ msg: "Incorrect password" })
                }
            } else {
                // user does not exist
                res.status(403).json({ msg: "User does not exist" });
            }
        }
        catch (err) {
            // error connecting to db
            res.status(500).json({ msg: "Error connecting to DB" })
        }
    } catch (err) {
        console.error(err);
    }
});