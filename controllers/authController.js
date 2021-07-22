const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/userModel");

exports.signup = async (req, res, next) => {
  try {
    let { firstName, lastName, email, password } = req.body;
    // hash incoming password from req.body

    const checkEmail = await user.findOne({ email });

    if (checkEmail) {
      return res.json("Email already exists!")
    }

    password = await bcrypt.hash(password, 12);

    // push new user to database
    const newUser = { firstName, lastName, email, password };
    const createUser = await user.create(newUser);

    const id = createUser._id;
    // sign jwt token with user id as payload
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(201).json({
      status: "success",
      token,
      data: {
        id: createUser._id,
        firstName: createUser.firstName,
        lastName: createUser.lastName,
        email: createUser.email
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err,
    });
    console.log(`Error 💥: ${err}`);
  }

  next();
};

exports.getAllUser = (req, res, next) => {
  try {
    // const user = User.find();

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {}
  next();
};
