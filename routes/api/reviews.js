require("dotenv").config();
const express = require("express");
const router = express.Router();

const db = require("../../models");

//getting reviews for the movie 
router.get('/', (req,res) => {

    const apiId = req.query.apiid;
    db.Movie.findOne({apiId: apiId}).populate({path:'reviews'})
    .then(foundReview => {
        console.log(foundReview.reviews)
        res.send(foundReview.reviews)
    
    })  
    .catch(err => (
        console.log(err)
    )) 

});


//adding review to the movie
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
    console.log(apiId)
    console.log(req.body.referencedReview)
    db.Movie.findOneAndUpdate(
        {
            apiId: apiId
        },
        {
            $pull: {reviews: {_id: req.body.id}}
        },
        {
            new: tru
        })
        .then(deletedcomment => {
            res.send(deletedcomment)
            console.log(deletedcomment)
        })
        .catch(err => {
            console.log(err)
            res.status(503).send({message: 'server error'})
        })

    })



module.exports = router;