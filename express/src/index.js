require("dotenv").config();

const express = require("express");
const UserRouter = require("./controllers/UserController");

const { PORT } = process.env;

const app = express();

app.use("/", UserRouter);

app.listen(PORT, () => console.log(`API listening on ${PORT}`));
