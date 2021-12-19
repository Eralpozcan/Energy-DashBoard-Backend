const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.post(
  "/register",
  [
    check("name", "is not valid,it must be min 3 length").isLength({
      min: 3,
    }),
    check("surname", "is not valid,it must be min 3 length").isLength({
      min: 3,
    }),
    check("email", "is not email").isEmail(),
    check(
      "password",
      "password is not valid, it must be min 6 length"
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { name, surname, email, password, role } = req.body;
    try {
      let usermail = await User.findOne({
          email
      })
      if(usermail){
          return res.status(400).send("Email is using")
      }
      user = new User({ name, surname, email, password, role });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        process.env.SECRET_KEY,
        {
          expiresIn: 10000,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token,
          });
        }
      );
    } catch (err) {
      res.status(500).json({
        success: false,
        err: err.message,
      });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "email is not valid").isEmail(),
    check("password", "password is not valid,it must be min 6 lentgh").isLength(
      {
        min: 6,
      }
    ),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({
            email
        })
        if(!user){
            return res.status(400).send("User not found")
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).send("Password wrong")
        }
        const payload = {
            user:{
                id:user.id,
                email:user.email,
                role:user.role
            }
        }
        jwt.sign(payload,process.env.SECRET_KEY,{
            expiresIn:10000
        },(err,token)=>{
            if(err) throw err
            res.status(200).json({
                token,payload
            })
        })
    } catch (err) {
      res.status(500).json({
        success: false,
        err: err.message,
      });
    }
  }
);


module.exports = router;
