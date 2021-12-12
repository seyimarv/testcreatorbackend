const express = require("express");

const { body } = require("express-validator/check"); //for validation

const User = require("../models/user");

const authController = require("../controllers/auth");

const router = express.Router();

import { Request, Response } from "express";
import { UserType } from "src/types/auth";

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value: String) => {
        return User.findOne({ email: value }).then((userDoc: UserType) => {
          if (userDoc) {
            return Promise.reject("E-mail already exists");
          } 
        }); //custom validation to check if email already exists in the database
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 6 }),
    body("name").trim().not().isEmpty().isLength({ min: 5 }),
  ],
  authController.signup
);

router.post('/login', authController.login)

module.exports = router;
