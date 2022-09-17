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


module.exports = router