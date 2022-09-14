require("dotenv").config();
const express = require("express");
const router = express.Router();


const db = require("../../models");

router.get('/', (req,res) => {
    // if(req.query.filter){
        // let f = req.query.filter.spliit(',')
        // console.log(f)
        db.Movie.find({'title':'testing'}).sort('-date')
        .then(foundMovie => {
            res.send(foundMovie)
        })
        .catch(err=>{
            console.log(err)
            res.status.apply(503).send({message: 'Database asleep?'})
        })
    // }
})

router.post('/', (req,res) =>
{
    db.Movie.create(req.body)
    .then(createdMovie => {
    res.status(201).send(createdMovie)
    })
    .catch(err => {
        console.log('Error while creating new post', err)
        if(err.name === 'Validation Error'){
            res.status(406).send({message: 'Validation Error'})
        } else {
            res.status(503).send({message: "Database or server error!"})
        }
    })
})



module.exports = router;