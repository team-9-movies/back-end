const express = require('express');
const app = express();

const movies = require("./routes/api/movies");
const myLists = require("./routes/api/mylists")

app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Backend')
})

app.use('/movies', movies);
app.use('/mylists', myLists);

app.listen(3001, function() {
    console.log('listening on 3001')
})