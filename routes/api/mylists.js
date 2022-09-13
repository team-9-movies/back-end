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
    res.status(201).send(createdMovie)
    })
    .catch(err => {
        console.log('Error while creating new post', err)
        if(err.name === 'Valication Error'){
            res.status(406).send({message: 'Validation Error'})
        } else {
            res.status(503).send({message: "Database or server error!"})
        }
    })
})



module.exports = router;