const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    let user = req.session.user
    console.log(user)
    res.render("index", {
        title: "title",
        user: user
    })
})

router.get("/about-us", (req, res) => {
    res.render("about-us", {
        title: "title"
    })
})

module.exports = router;