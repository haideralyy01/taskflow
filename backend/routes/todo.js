const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { TodoModel } = require("../database/db");
const { middleware } = require("../middlewares/user");
const todoRouter = Router();

todoRouter.post("/todo", middleware, async (req, res) => {
    const userId = req.userId;
    const { todoItem, completed } = req.body;

    try {
        await TodoModel.create({
            userId,
            todoItem,
            completed
        });
        res.status(200).json({
            message: "Todo created successfully"
        });
    } catch (err) {
        res.status(400).json({
            message: "Error creating todo",
            error: err.message
        });
    }
});

todoRouter.get("/todos", middleware, async (req, res) =>{
    const userId = req.userId;
    try {
        const todos = await TodoModel.find({
            userId
        });

        res.status(200).json({
            message: "Todos fetched successfully",
            todos
        })
    } catch (err) {
        res.status(500).json({
            message: "Error fetching todos",
            error: err.message
        });
    }
});

module.exports = {
    todoRouter
}