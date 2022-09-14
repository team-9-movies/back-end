const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const MovieSchema = new Schema(
    {
        apiId:
        {
            type: String,
            required: true,
            unique: true
        },
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
        favoriteOf:
        [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }],
        reviews:
            [{
                type: Schema.Types.ObjectId,
                ref: "Review"
            }],
        date:
        {
            type: Date,
            default: Date.now()
        }
    });

module.exports = Movie = mongoose.model("Movie", MovieSchema);
