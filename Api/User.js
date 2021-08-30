const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

var validator = require("validator");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({
    where: { email: email },
  });
  if (!user) return res.json({ error: "User Doesn't Exist" });
  if (user.password == "") {
  } //send user to create password page

  bcrypt.compare(password, user.password).then(async (match) => {
    if (!match) res.json({ error: "please check Username or Password " });
    res.json(`${user.firstname}  `);
  });
});

router.post("/signUp", async (req, res) => {
  const { firstname, lastname, password, email, role } = req.body;
  const validEmail = await emailValidator(email);
  if (validEmail) return res.json(validEmail);

  await bcrypt.hash(password, 8, (err, hash) => {
    Users.create({
      userId: uuidv4(),
      firstname: firstname,
      lastname: lastname,
      password: hash,
      email: email,
      role: role,
    });
  });

  return res.json("Sign Up is Completed");
});

const emailValidator = async (email) => {
  const checkemail = validator.isEmail(email);
  if (!checkemail) {
    return "please enter a valid email";
  }
  const user = await Users.findOne({
    where: { email: email },
  });
  if (user) return "email Used";
 
};
module.exports = router;
