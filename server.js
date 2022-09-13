const express = require('express');
const SearchMovies = require('./modules/SearchMovies');
const cors = require('cors');

const app = express();
const movie = require("./routes/api/movies");

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Backend')
})

app.get('/movie', SearchMovies)

app.listen(3001, function() {
    console.log('listening on 3001')
})