const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const MovieSchema = new Schema(
{
    title:
    {
        type: String,
        required: true
    },
    imgUrl: String,
    trailerUrltype: String,
    director: String,
    year: String,
    review: String,
    author:
    {
        type: Schema.ObjectId,
        ref: "User"
    },
    date:
    {
        type: Date,
        default: Date.now()
    }

});

module.exports = Movie = mongoose.model("Movie", MovieSchema);
