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
        apiId: { type: Number, required: true, unique: true },
        title: { type: String, required: true },
        overview: String,
        imgUrl: String,
        trailerUrltype: String,
        director: String,
        year: String,
        review: String,
        favoriteOf: [{ type: Schema.Types.ObjectId, ref: "User" }],
        reviews: [ReviewSchema],
        date: { type: Date, default: Date.now() }
    });

module.exports = Movie = mongoose.model("Movie", MovieSchema);
