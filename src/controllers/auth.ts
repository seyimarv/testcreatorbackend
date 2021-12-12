const User = require("../models/user");

const { validationResult } = require("express-validator/check");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

import { NextFunction, Request, Response } from "express";
import { CustomError } from "../models/customerror";

exports.signup = async (req: Request, res: Response, next: any) => {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      throw new CustomError("Signup failed", 422, errors.array());
    }
    const hashedpass = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      password: hashedpass,
      name: name,
    });
    const result = await user.save();
    res.status(201).json({ message: "User created", user: result });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req: Request, res: Response, next: NextFunction) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new CustomError("User email does not exist", 401);
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    console.log(isPasswordCorrect)
    if (!isPasswordCorrect) {
      throw new CustomError("Password is incorrect", 401);
    }
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      "somesupersecretsecret",
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json({
        token: token,
        userId: user._id.toString(),
        userName: user._doc.name,
      });
  } catch (err) {
    next(err);
  }
};
