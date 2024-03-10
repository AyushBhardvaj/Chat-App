import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please enter your name"],
      maxLenth: [30, "You canno exceed 30 characters"],
      minLength: [3, "You should have minimum of 4 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter your name"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a valid password"],
      minLength: [6, "You should have minimum of 6 characters"],
      select: false, //It will not return password
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getJWTToken = function () {
  process.env.JWT_EXPIRE
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const User = mongoose.model("User", userSchema);
export default User;
