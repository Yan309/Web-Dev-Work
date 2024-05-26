const express = require("express");
const mongoose = require("mongoose");
const ejsLayouts = require("express-ejs-layouts");
const session = require("express-session");

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.set("view engine", "ejs");
server.use(ejsLayouts);
server.use(express.static("public"));
server.use(session({ secret: "Its  a secret" }));

mongoose.connect("mongodb://localhost:27017/LeRix").then(() => {
    console.log("DB Connected");
});


server.use(require("./middlewares/siteMiddleware"));
const router = require("./routes/site/songs.js");

server.use("/", router);
const authRouter = require("./routes/site/auth.js");
server.use("/", authRouter);



server.listen(3000, () => {
    console.log('Server is running on port 3000');
});