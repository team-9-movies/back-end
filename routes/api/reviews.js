require("dotenv").config();
const express = require("express");
const router = express.Router();


const db = require("../../models");

//getting the review for the movie 
router.get('/', async (req,res) => {

    const apiId = req.query.apiid;
    await db.Movie.find({apiId: apiId})
    .populate({path:'reviews',select:'text'})
    .then(foundReviews => {
        res.send(foundReviews)
    })  

})


// adding comments
router.put('/', (req,res)=>
{
    const apiId = req.query.apiid;
    db.Movie.findOneAndUpdate({
        apiId:apiId
    }, 
    {$push:
        {
            reviews: {
            text: req.body.text, 
            user: req.body.user,
            email: req.body.email,
            nickName: req.body.nickName
            }
        }       
    },   
    {
        new: true
    })
    .then(updatedMovie => {
        res.send(updatedMovie)
        console.log(updatedMovie)
    })
    .catch(err => {
        console.log(err)
        res.status(503).send({message: 'server error'})
    })
})





module.exports = router;