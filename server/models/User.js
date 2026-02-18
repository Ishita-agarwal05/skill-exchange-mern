const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
skillsHave: {
  type: String,
},
skillsWant: {
  type: String,
},
bio: {
  type: String,
  default: ""
},
connections: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
}],
requestsSent: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
}],
requestsReceived: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
}],
linkedin: {
  type: String,
  default: ""
},
contact: {
  type: String, // WhatsApp / Discord / Email
  default: ""
}



});

module.exports = mongoose.model("User", UserSchema);
