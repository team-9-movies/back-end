const express = require('express');
const app = express();

const movie = require("./routes/api/movies");

app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Backend')
})

app.listen(3001, function() {
    console.log('listening on 3001')
})