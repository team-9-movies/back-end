require("dotenv").config();
const express = require("express");
const router = express.Router();
const db = require("../../models");
const getUser = require("../../modules/getUser");

router.get('/', (req, res) => {
    db.Movie.find({ 'title': 'testing' }).sort('-date')
        .then(foundMovie => {
            res.send(foundMovie)
        })
        .catch(err => {
            console.log(err)
            res.status.apply(503).send({ message: 'Database asleep?' })
        })
    // }
})

router.get('/favorites', async (req, res) => {
    const email = req.query.email;
    try {
        const user = await db.User.findOne({ email })
        if (user) {
            await user.populate('movies');
            res.status(200).send(user.movies);
        }
        else {
            res.status(200).send([]);
        }
    } catch (err) {
        res.status(500).send('Error fetching favorites from db')
    }
})

router.post('/', async (req, res) => {
    let userEmail = req.body.email;
    let userName = req.body.name;
    let apiId = req.body.apiId;

    const user = await getUser(db.User, userEmail, userName);

    const existingMovie = await db.Movie.findOne({ apiId })

    if (existingMovie) {
        existingMovie.favoriteOf.push(user._id)
        const updatedMovie = await existingMovie.save();

        //add to user's movie array
        user.movies.push(existingMovie._id);
        await user.save();
        res.send([updatedMovie, user]);
    } else {
        req.body.favoriteOf = [user._id];

        db.Movie.create(req.body)
            .then(async (createdMovie) => {
                user.movies.push(createdMovie._id);
                await user.save();
                res.status(201).send([createdMovie, user]);
            })
            .catch(err => {
                console.log('Error while creating new post', err)
                if (err.name === 'Validation Error') {
                    res.status(406).send({ message: 'Validation Error' })
                } else {
                    res.status(503).send({ message: "Database or server error!" })
                }
            })
    }

    // TODO: get review for details button
    router.get('/getreview', async()=>{
        
    })

    // TODO: add review
    router.post('/addreview', async (req, res)=> {
        // receive: review text, user email, user name, movie mongodb _id
        // look up database _id of user by email
        // create a review with that user _id
        // send back response with created review (but populate first)        
    })

    // TODO: edit a review (only author can edit)

    // TODO: delete a review (only author can delete)

    // TODO: delete movie from favorites (using put instead of delete, because we need both the movie id and user id in body)
    router.put('/', async (req, res)=>{
        // receive movie id and user id
        // find user by id, then loop through movies array and delete the movie id there

        // then find the movie by id, and check if favoriteOf array length is less than 2
        //      if yes, then delete that movie from collection (isung deleteOne({_id: movie id}))
        //      else, just update favoriteOf array by removing the movie Id from it (keep the movie document itself)

    })

})

// creating new user 
router.post('/newUser', async(req, res) => {
    db.User.create(req.body)
    .then(createdUser => {
        res.status(201).send(createdUser)
    })
 })

module.exports = router;