require("dotenv").config();
const express = require("express");
const router = express.Router();


const db = require("../../models");

//getting the review for the movie 
router.get('/', (req,res) => {

    const apiId = req.query.apiid;
    console.log(apiId);
    db.Movie.findOne({apiId: apiId}).populate({path:'reviews'})
    .then(foundReview => {  
        const reviews = foundReview ? foundReview.reviews : []
        res.status(200).send(reviews)    
    })  
    .catch(err => (
        console.log(err)
    ))
});



// adding reviews to the movie
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