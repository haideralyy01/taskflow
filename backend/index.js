require("dotenv").config();
const express = require("express");
const { userRouter } = require("./routes/user");
const { todoRouter } = require("./routes/todo");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors({
    origin: "http://localhost:8080",
    methods: ["GET", "POST","PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}))

app.use("/api", userRouter);
app.use("/api", todoRouter);

const PORT = process.env.PORT || 3000 ;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});