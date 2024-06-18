const mongoose = require("mongoose");
const Schema = mongoose.Schema; //Create new schema from mongoose

const memberSchema = new Schema(
  {
    //Define user schema
    username: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    name : {
      type: String,
      require: true,
    },
    YOB : {
      type : Number,
      require : true
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

const Member = mongoose.model("members", memberSchema); //Create new model from schema
module.exports = Member;
