const mongoose = require("mongoose");
const _ = require("lodash");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  sessions: [
    {
      token: {
        type: String,
        required: true,
      },
      expiresAt: {
        type: Number,
        required: true,
      },
    },
  ],
});

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  // return the document except the password and sessions (these shouldn't be made available)
  return _.omit(userObject, ["password", "sessions"]);
};
