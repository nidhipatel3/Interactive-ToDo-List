const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");

const taskRoute = require("./routes/task");

const app = express();
const PORT = 9001;

mongoose.connect("mongodb://localhost:27017/tododb")
    .then(() => console.log("MongoDB Connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public/js")));
app.use(express.static(path.join(__dirname, "public/css")));

app.get('/', (req, res) => {
    return res.render("home")
});

app.use("/task", taskRoute);

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));