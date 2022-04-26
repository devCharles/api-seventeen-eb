const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
     firstname: { type: String, required: true},
     lastname: { type: String, required: true},
     email: { type: String, required: true},
     password: { type: String, required: true},
     image:{type:String,required:false,default:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png"},
     country: { type:String, required: false},
	 birthday: {type: Date, required: false},
	 description: {type: String, required: false}
})

module.exports = {
    schema,
    model: mongoose.model("User", schema),
}