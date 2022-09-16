require("dotenv").config();
const express = require("express");
const router = express.Router();

const db = require("../../models");

//getting reviews for the movie 
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


//adding review to the movie
router.put('/', (req,res)=>

{
    console.log('adding review body', req.body)
    const apiId = req.query.apiid;
    db.Movie.findOneAndUpdate({
        apiId:apiId
    }, 
    {$push:
        {
            reviews: {
            text: req.body.text, 
            user: req.body.user,
            email: req.body.userEmail,
            nickName: req.body.nickName
            }
        }       
    },   
    {
        new: true
    })
    .then(updatedMovie => {
        res.send(updatedMovie)
        // console.log(updatedMovie)
    })
    .catch(err => {
        console.log(err)
        res.status(503).send({message: 'server error'})
    })
})


// editing review 
router.put('/edit', (req,res)=>{
    
    const apiId = req.query.apiid
    console.log(apiId)
    console.log(req.body.reviewId)
    db.Movie.findOneAndUpdate(
        {
            apiId: apiId,
            reviews:{$elemMatch:{_id:req.body.reviewId}}
        },
        {
            $set:
            {"reviews.$.text": req.body.text}
        }
    ).then(editedReview => {
        res.send(editedReview)
        // console.log(editedReview)
    }).catch(err => {
        console.log(err)
        res.status(503).send({message: 'server error'})
    })
}
)


//deleting review 
router.put('/delete', (req,res)=>{   
    const apiId = req.query.apiid
    db.Movie.findOneAndUpdate(
        {
            apiId: apiId
        },
        {
            $pull: {reviews: {_id: req.body.reviewId}}
        },
        {
            new: true
        })
        .then(deletedcomment => {
            res.send(deletedcomment)
        })
        .catch(err => {
            console.log(err)
            res.status(503).send({message: 'server error'})
        })

    })



module.exports = router;