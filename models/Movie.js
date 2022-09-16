const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Review Schema

const ReviewSchema = new Schema(
    {
      text: { type: String, required: true },
      user: {type:Schema.Types.ObjectId, ref:"User"},
      email: { type: String, required: true },
      nickName: String,
      date: { type: Date, default: Date.now() }
    });

module.exports = Review = mongoose.model("Review", ReviewSchema);

const MovieSchema = new Schema(
    {
        backdrop_path: String,
        genre_ids: Array,
        apiId: { type: Number, required: true, unique: true },
        original_title: { type: String, required: true },
        overview: String,
        popularity: Number,
        poster_path: String,
        release_date: String,
        title: String,
        vote_average: Number,
        vote_count: Number,
        favoriteOf: [{ type: Schema.Types.ObjectId, ref: "User" }],
        reviews: [ReviewSchema],
        date: { type: Date, default: Date.now() }
    });

module.exports = Movie = mongoose.model("Movie", MovieSchema);
