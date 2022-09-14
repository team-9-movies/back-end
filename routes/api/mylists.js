require("dotenv").config();
const express = require("express");
const router = express.Router();
const db = require("../../models");
const getUserId = require("../../modules/getUserId");

router.get('/favorites', async (req,res) => {
    // console.log("/mylists working")
    // const allMovies = await db.Movie.find({})
    // res.status(200).send(allMovies);
    const result = await db.User.findById(req.query.)
})

router.post('/', async (req,res) =>
{
    let userEmail = req.body.email;
    let userName = req.body.name;    
    const userId = await getUserId(db.User, userEmail, userName);
    req.body.author = userId;

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

router.get('/populate', async (req,res)=>{
    const result = await db.Movie.
    findOne({title: 'movie5'}).
    populate('author')

    res.send(result);
})

router.get('/test', async (req,res)=>{
    const results = await db.Movie.populated('author')
    res.send(results);
})


module.exports = router;