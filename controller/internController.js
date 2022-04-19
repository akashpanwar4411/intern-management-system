const Intern = require("../models/internModel");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.getIntern = async (req, res) => {
  console.log('hello');
  try {
    const doc = await Intern.findOne({'_id': req.params.id});

    if (!doc) {
      throw new Error("No document exist with this ID!");
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getAllInterns = async (req, res) => {
  try {
    const doc = await Intern.find();

    res.status(200).json({
      status: "sucess",
      result: doc.length,
      data: {
        doc,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Please provide email and password");
    }

    const intern = await Intern.findOne({ email }).select("+password");

    if (!intern || password != intern.password) {
      throw new Error("Invalid email or password");
    }

    createAndSendToken(intern, 200, req, res);
  } catch (err) {
    res.json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.signUp = async (req, res) => {
  
  try {
    const newIntern = await Intern.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    // status code 201 : created
    res.status(201).json({
      status: "success",
      data: {
        data: newIntern,
      },
    });

    createAndSendToken(newIntern, 201, req, res);
  } catch (err) {
    res.json({
      status: "fail",
      message: err.message,
    });
  }
};
