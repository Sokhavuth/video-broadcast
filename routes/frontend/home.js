// routes/frontend/home.js

const express = require("express")
const router = express.Router()

const home = require("../../controllers/frontend/home")

router.get("/", async (req, res) => {
    home.getPage(req, res)
})

router.post("/navigate/:element", async (req, res) => {
    home.navigate(req, res)
})

router.get("/random", async (req, res) => {
    home.getRandomItems(req, res)
})

router.get("/book/:key", async (req, res) => {
    home.getBook(req, res)
})


module.exports = router