require("dotenv").config();
const express = require("express");
const router = express.Router();


const db = require("../../models");

router.get('/', (req,res) => {
    console.log("/movies working")
})

router.post('/', (req,res) =>
{
    db.Movie.create(req.body)
    .then(createdMovie => {
        console.log(createdMovie)
    })
})

module.exports = router;