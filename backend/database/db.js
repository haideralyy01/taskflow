const mongoose = require("mongoose");

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected uccessfully");
    } catch (err) {
        console.error("Database connection error:", err.message);
        process.exit(1)
    }
})();

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema ({
    email: {type: String, unique: true},
    password: String,
    name: String
});

const Todo = new Schema ({
    userId: ObjectId,
    todoItem: String,
    completed: Boolean
});

const UserModel = mongoose.model('users', User);
const TodoModel = mongoose.model('todos', Todo);

module.exports = {
    UserModel,
    TodoModel
}