const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
  {
    text: {
      type: String,
      required: true
    },
    author: {
      email: String,
      
    }
    // email:
    // {
    //     type: String,
    //     required: true
    // },
    // name: String,
    // movies:
    // [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Movie'

    // }],
  });

module.exports = Review = mongoose.model("Review", ReviewSchema);