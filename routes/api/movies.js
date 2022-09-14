require("dotenv").config();
const express = require("express");
const router = express.Router();


const db = require("../../models");

router.get('/', (req,res) => {
    console.log("/movies working")
    res.send('/movies working')
})


module.exports = router;