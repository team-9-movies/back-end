require("dotenv").config();
const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI

//Mongo connection
mongoose.connect(MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true

    });

//mongoose connection object
const db = mongoose.connection;


//set up an event listener to fire once when the connections "opens"
//console log what host and port it's ruwhen nning on
db.once("open", () =>
{
    console.log(`Connected to MongoDB at 3001`);
});

db.on("error", (err) =>
{
    console.log(`Database error \n ${err}`);
});

module.exports.User = require("./User");
module.exports.Movie = require("./Movie");
// module.exports.Review = require("./Review");

