require("dotenv").config();
const express = require("express");
const router = express.Router();


const db = require("../../models");

//getting the review for the movie 
router.get('/', (req,res) => {
    console.log("/movies working")
    res.send('/movies working')
})

//creating the review
router.post('/new', (req,res) => {
    db.Review.create(req.body)
    .then(createdReview => {
        res.status(201).send(createdReview)
    })
    .catch(err => {
        console.log('Error while creating new review', err)
        if(err.name === 'Validation Error'){
            res.status(406).send({message: 'Validation Error'})
        } else {
            res.status(503).send({message: "Database or server error!"})
        }
    })
})



module.exports = router;