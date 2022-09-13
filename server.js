const express = require('express');
const SearchMovies = require('./modules/SearchMovies');
const cors = require('cors');
const app = express();
const movies = require("./routes/api/movies");
const myLists = require("./routes/api/mylists")

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Backend')
})

app.get('/movie', SearchMovies)

app.use('/movies', movies);
app.use('/mylists', myLists);

app.listen(3001, function() {
    console.log('listening on 3001')
})