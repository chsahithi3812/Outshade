const { validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const getUserById = async (req, res, next) => {
  const uid = req.params.uid;
  let user;
  try {
    user = await User.findById(uid).exec();
  } catch (err) {
    return next(Error(err, 500));
  }
  res.json({ user });
};
const signin = async (req, res, next) => {
  const errors = validationResult(req);
  const {  emailId,  password, cpassword } = req.body;
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(Error("InValid Input", 400));
  } else if (password !== cpassword) {
    return next(Error("InValid Input", 400));
  } else if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(emailId)) {
    return next(Error("InValid Input", 400));
  }
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      return res.status(500).json({ error: err });
    } else {
      const user = new User({
        
        emailId,
        password: hash,
        cpassword,
      });

      await user
        .save()
        .then(() => {
          res.json({ user: user.toObject({ getters: true }) });
        })
        .catch((err) => {
          return next(new Error(err, 401));
        });
    }
  });
};

const login = async (req, res, next) => {
  const { emailId, password } = req.body;
  User.find({ emailId })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(400).json({ message: "Auth Failed" });
      }
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (err) {
          return res.status(400).json({ message: "Auth Failed" });
        }
        if (result) {
          const token = jwt.sign(
            {
              emailId: user[0].emailId,
              name: user[0].name,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );
          return res
            .status(200)
            .json({ message: "Auth Sucessfull", token: token });
        }
        res.status(400).json({ message: "Auth Failed" });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

const forgotPassword = async (req, res, next) => {
  const email = req.body.email;
  const existingUser = await User.find({ emailId: email }).exec();

  if (existingUser.length > 0) {
    const secret = process.env.JWT_KEY + existingUser[0].password;
    const payload = {
      email: existingUser[0].email,
      id: existingUser[0]._id,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "15m" });
    const link = `http:localhost:5000/user/resetpassword/${existingUser[0].id}/${token}`;

    const oAuth2Client = new google.auth.OAuth2(
      process.env.Client_ID,
      process.env.Client_secret,
      process.env.redirect_url
    );
    oAuth2Client.setCredentials({ refresh_token: process.env.refresh_token });

    async function sendMail() {
      try {
        const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
          service: "gmail",
          auth: {
            type: "OAuth2",
            user: process.env.USER,
            clientId: process.env.Client_ID,
            clientSecret: process.env.Client_secret,
            refreshToken: process.env.refresh_token,
            accessToken: accessToken,
          },
        });
        const mailOptions = {
          from: "Sahithi <chsahithi.3812@gmail.com>",
          to: email,
          subject: "Reset Link",
          text: `Reset link is ${link}`,
          html: `<a href=${link}>Click Here for reset</a>`,
        };

        const result = await transport.sendMail(mailOptions);
        return result;
      } catch (err) {
        return err;
      }   
    }

    sendMail()
      .then((result) => {
        console.log("email sent", result);
      })
      .catch((err) => {
        console.log(err);
      });

    res.json({ link });
    console.log(link);
  } else {
    res.status(500).json({ message: "Email not registered" });
    return;
  }
};

const resetpassword = async (req, res, next) => {
  const { id, token } = req.params;

  const existingUser = await User.findOne({ _id: id }).exec();

  if (!existingUser) {
    res.json({ message: "Invalid Id" });
    return;
  }

  const secret = process.env.JWT_KEY + existingUser.password;
  try {
    const payload = jwt.verify(token, secret);
    const id = payload.id;
    const user = await User.findById(id).exec();
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({ error: err });
      } else {
        user.password = hash;
        await user.save();
      }
    });
    res.json({ user });
  } catch (err) {
    res.status(401).json({ error: err });
  }
};

const updateProfile = async (req, res, next) => {
  const uid = req.params.uid;

  let user;
  try {
    user = await User.findById(uid).exec();
  } catch (err) {
    next(Error(err, 500));
  }

  if (!user) {
    return next(new Error(`Couldn't find user`, 404));
  }

  const { name, emailId, mobile } = req.body;
  try {
    user.name = name;
    user.emailId = emailId;
    user.mobile = mobile;
    await user.save();
  } catch (err) {
    return next(Error(err, 500));
  }
  res.json({ user });
};

exports.signin = signin;
exports.login = login;
exports.forgotPassword = forgotPassword;
exports.resetpassword = resetpassword;
exports.updateProfile = updateProfile;
exports.getUserById = getUserById;
