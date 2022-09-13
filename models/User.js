const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        email:
        {
            type: String,
            required: true
        },
        name:
        {
            type: String
        },
        movies:
        [{
            type: Schema.ObjectID,
            ref: "Movie"
        }]
    }
)