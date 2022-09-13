const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const MovieSchema = new Schema(
{
    title:
    {
        type:String,
        required: true
    },
    imgUrl:
    {
        type: String,
    },
    trailerUrl:
    {
        type: String,
    },
    director:
    {
        type: String,
    },
    year:
    {
        type: String,
    },
    review:
    {
        type: String,
    },
    user:
    {
        type:Schema.ObjectId,
        ref: "User"
    },
    date:
    {
        type: Date,
        default: Date.now()
    }

});

module.exports = Movie = mongoose.model("Movie", MovieSchema);
