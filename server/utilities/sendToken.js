const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    user = userWithoutPassword;
  
    return res
      .status(statusCode)
      .cookie("token", token, options)
      .json({ success: true, user, token });
  };
  
  export default sendToken;
  