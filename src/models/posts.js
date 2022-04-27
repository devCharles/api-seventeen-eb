const mongoose = require("mongoose");
const { post } = require("../routes/auth");

const Schema = mongoose.Schema;

const schema = new Schema({
  postID: {type: Number, required: false},
  title: { type: String, required: true },
  tags: { type: Array, required: false },
  counterReactions: { type: Number, required: false },
  counterComents: { type: Number, required: false },
  datetime: { type: Date, required: false },
  image: { type: String, required: false },
  contentText: { type: String, required: false },
  day: {type: Number, required: true},
  month: {type: Number, required: true},
  year: {type: Number, required: true},
  user: 
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  
})

module.exports = {
  schema,
  model: mongoose.model("Post", schema),
}

 



