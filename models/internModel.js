const mongoose = require("mongoose");
const validator = require("validator");

const internSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    require: [true, "Please provide a email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  role: {
    type: String,
    default: "Software Engineer",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    select: false,
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (val) {
        return val === this.password;
      },
      message: "Passwords are not the same",
    },
  },
  monthlySalery:{
    type: Number,
    default: '30000'
  },
  ctc: {
    type: String,
    default: '4 LPA'
  }
});


const Intern = mongoose.model('Intern', internSchema);

module.exports = Intern;