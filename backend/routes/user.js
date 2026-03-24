const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../database/db");
const { JWT_SECRET } = require("../configurations/config");
const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
    const { email, password, name } = req.body;

    try {
        await UserModel.create ({
            email,
            password,
            name
        });

        res.status(200).json({
            message: "User created successfully"
        })
    } catch (err) {
        res.status(400).json({
            message: "Error creating user",
            error: err.message
        });
    }
});

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({
            email,
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const token = jwt.sign({
            id: user._id
        }, JWT_SECRET, { expiresIn: "1h"})

        res.status(200).json({
            message: "Login successful",
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