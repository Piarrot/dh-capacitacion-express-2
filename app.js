const express = require("express");
var session = require('express-session')
const app = express();

//Views
app.set("view engine", "ejs");
app.set("views","./views");
app.use(express.static("public"));

//Middlewares
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(session({
    secret: 'los gatitos son lo mejor',
    resave: false,
    saveUninitialized: true
}))
app.use(require("./middlewares/authMiddleware"))

//Routes
const baseRouter = require("./routes/baseRouter");
const authRouter = require("./routes/authRouter");

app.use("/", baseRouter);
app.use("/auth", authRouter);

app.listen(3000, ()=>{
    console.log("Estamos escuchando en el puerto 3000");
})