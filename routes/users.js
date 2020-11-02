const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const UserSchema = require("../schemas/User");
const config = require("config");
const auth = require('../middleware/auth.js')

router.get(
    '/',
    auth,
    async (req, res) => {
        try {

            const user = await UserSchema.findById(req.user.id).select('-password');
            res.json(user)
        } catch(error) {
            console.log(error)
            return res.status(500).json({ msg: "Server error..."})
        }
    }
)

router.post(
  "/register",
  [
    check("email", "E-mail is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    check("password", "Password not minimum length").isLength({ min: 5 }),
    check("fname").not().isEmpty(),
    check("lname").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      let { fname, lname, email, password } = req.body;
      let user = await UserSchema.findOne({ email });
      const errors = validationResult(req); // errors = []
      if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
      }
      if (user) {
        return res
          .status(401)
          .json({ msg: "There is already a user with this email" });
      }

      const salt = await bcryptjs.genSalt(8);
      password = await bcryptjs.hash(password, salt);
      user = new UserSchema({
        email,
        password,
        fname,
        lname,
      });
      await user.save();
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, config.get("jwtSecret"), (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Server error..." });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "E-mail is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
  ],
  async (req, res) => {
   
    try {
      let { email, password } = req.body;
      console.log(req.body)
      let user = await UserSchema.findOne({ email });
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
      }

      if (!user) {
        return res
          .status(400)
          .json({ msg: "There is no user with this email" });
      }
      let isPassowrdMatch = await bcryptjs.compare(password, user.password);

      if (isPassowrdMatch) {
        const payload = {
          user: {
            id: user.id,
          },
        };

        jwt.sign(payload, config.get("jwtSecret"), (err, token) => {
          if (err) throw err;
          res.json({ token });
        });
      } else {
          return res.status(401).json({msg: "Incorrect password"})
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Server error..." });
    }
  }
);

module.exports = router;
