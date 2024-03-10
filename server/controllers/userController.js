import User from "../models/userModel.js";
import sendToken from "../utilities/sendToken.js";

export const registerUser = async (req, res) => {
  try {
    console.log("request received");
    const { fullName, email, password } = req.body;
    console.log(req.body);
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "email is already registerd" });
    }

    const newUser = await User.create({
      fullName,
      email,
      password,
    });
    console.log(newUser);
    sendToken(newUser, 201, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login a user
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // i am not validating the availability of email and password. As in github.

    let user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ error: "User not registered" });
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    sendToken(user, 201, res);
    // Need to check if password is not getting sent.
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
