const mongoose = require("mongoose");
// const { Movie } = require(".");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
{
    email: { type: String, unique: true, required: true },
    name: String,
    movies: [
        { type: Schema.Types.ObjectId, ref: 'Movie', unique: true}
    ],
});

module.exports = User = mongoose.model("User", UserSchema);

