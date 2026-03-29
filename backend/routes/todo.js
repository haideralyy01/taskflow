const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { TodoModel } = require("../database/db");
const { middleware } = require("../middlewares/user");
const todoRouter = Router();

todoRouter.post("/todo", middleware, async (req, res) => {
    const userId = req.userId;
    const { todoItem, completed } = req.body;

    try {
        const todo = await TodoModel.create({
            userId,
            todoItem,
            completed
        });
        res.status(200).json({
            message: "Todo created successfully",
            todo
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

todoRouter.put("/todo/:id", middleware, async (req, res) => {
    const { id } = req.params;
    const { todoItem, completed } = req.body;

    try {
        const updateTodo = await TodoModel.findByIdAndUpdate({
            _id: id
        }, {
            todoItem,
            completed
        }, {
            new: true
        });
        if (!updateTodo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }
        res.status(200).json({
            message: "Todo updated successfully",
            updateTodo
        });
    } catch (err) {
        res.status(400).json({
            message: "Error updating todo",
            error: err.message
        });
    }
});

todoRouter.delete("/todo/:id", middleware, async (req, res) => {
    const { id } = req.params;
    try {
        const deleteTodo = await TodoModel.findByIdAndDelete(id);
        if (!deleteTodo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }
        res.status(200).json({
            message: "Todo deleted successfully"
        });
    } catch (err) {
        res.status(400).json({
            message: "Error deleting todo",
            error: err.message
        });
    }
});

module.exports = {
    todoRouter
}