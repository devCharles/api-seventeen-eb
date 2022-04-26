const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
  title: { type: String, required: true },
  tags: { type: Array, required: false },
  reactions: { type: Number, required: false },
  comments: { type: Number, required: false },
  publishDate: { type: Date, required: false },
  imageUrl: { type: String, required: false },
  description: { type: String, required: false },
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
})

module.exports = {
  schema,
  model: mongoose.model("Post", schema),
}