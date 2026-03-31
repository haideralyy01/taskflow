const { z } = require("zod");
const bcrypt = require("bcrypt");
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../database/db");
const { JWT_SECRET } = require("../configurations/config");
const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
    const signupSchema = z.object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password required"),
        name: z.string().min(1, "Name required")
    });

    const parseResult = signupSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({
            msg: "Validation error",
            errors: parseResult.error.errors
        });
    }
    const { email, password, name } = parseResult.data;

    try {
        const existingUser = await UserModel.findOne({
            email
        });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await UserModel.create ({
            email,
            password: hashedPassword,
            name
        });

        const token = jwt.sign({
            id: user._id
        }, JWT_SECRET, { expiresIn: "1h"});

        const safeUser = {
            _id: user._id,
            email: user.email,
            name: user.name
        }
        res.status(200).json({
            message: "User created successfully",
            user: safeUser,
            token
        })
    } catch (err) {
        res.status(400).json({
            message: "Error creating user",
            error: err.message
        });
    }
});

userRouter.post("/login", async (req, res) => {
    const loginSchema = z.object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password required")
    });
    const parseResult = loginSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({
            msg: "Validation error",
            errors: parseResult.error.errors
        });
    }
    const { email, password } = parseResult.data;

    try {
        const user = await UserModel.findOne({
            email,
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }

        const token = jwt.sign({
            id: user._id
        }, JWT_SECRET, { expiresIn: "1h"})

        const safeUser = {
            _id: user._id,
            email: user.email,
            name: user.name
        }

        res.status(200).json({
            message: "Login successful",
            user: safeUser,
            token
        });
    } catch (err) {
        res.status(500).json({
            message: "Error during login",
            error: err.message
        });
    }
});

module.exports = {
    userRouter
}