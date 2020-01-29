const bcrypt = require("bcrypt");
const fs = require("fs");

const controller = {
    showRegister: (req, res) => {
        res.render("auth/register")
    },
    processRegister: (req, res) => {
        let user = req.body;
        user.password = bcrypt.hashSync(user.password, 10);
        let users = []
        const path = "./data/users.json"
        if (fs.existsSync(path)) {
            users = JSON.parse(fs.readFileSync(path))
        }
        users.push(user);
        fs.writeFileSync(path, JSON.stringify(users, null, 2))

        res.send("register recibido");
    },
    showLogin: (req, res) => {
        res.render("auth/login")
    },
    processLogin: (req, res) => {
        const path = "./data/users.json"
        if (!fs.existsSync(path)) {
            res.render("auth/login");
            return;
        }
        let users = JSON.parse(fs.readFileSync(path))
        let user = users.find((elem) => {
            return elem.email == req.body.email;
        })
        if (!user) {
            res.render("auth/login");
            return;
        }
        if (bcrypt.compareSync(req.body.password, user.password)) {
            delete user.password;
            req.session.user = user;
            res.redirect("/")
        }
    }
}

module.exports = controller;