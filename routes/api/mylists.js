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
    let userName = req.body.name || 'Anonymous';
    let apiId = req.body.id;
    req.body.apiId = apiId;

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
})

// deleting movie
router.put('/delete', async (req, res)=>{
    const email = req.query.email
    db.User.findOneAndUpdate(
        {
            email: email
        },
        {
            $pull: {movies: req.body.id}
        },
        {
            new: true
        })
        .then(deletedMovie => {
            res.send(deletedMovie)
        })
        .catch(err => {
            console.log(err)
            res.status(503).send({message: 'server error'})
        })
    })


// creating new user for testing purpose
router.post('/newUser', async(req, res) => {
    db.User.create(req.body)
    .then(createdUser => {
        res.status(201).send(createdUser)
    })
 })

module.exports = router;