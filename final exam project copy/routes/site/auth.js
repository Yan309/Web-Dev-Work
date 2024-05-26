const express = require("express");
const req = require("express/lib/request");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require('bcrypt');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.get("/register", (req, res) => {
  if(req.session.user){
   return res.redirect("/");
  }
  return res.render("auth/signup");
});

router.post("/register", async (req, res) => {
   let username = await User.findOne({ name: req.body.name });
    if (username) {
        res.flash("danger", "Username Already Exists");
        return res.redirect("/register");
        }
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    res.flash("danger", "User Already Exists");
    return res.redirect("/register");
  }
  
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const name = req.body.name.trim();
  const email = req.body.email.trim();
  const password = hashedPassword;
  const role = "user";
  let registered = await User.create({ name, email, password, role });
  res.flash("success", "User registered successfully");
  return res.redirect("/login");
});


router.get("/logout", (req, res) => {
  req.session.user = null;
 return  res.redirect("/");
});



router.get("/login", (req, res) => {
  return res.render("auth/login");
});


router.post("/login", async (req, res) => {
  
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.flash("danger", "Invalid Credentials");
    return res.redirect("/login");
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    res.flash("danger", "Invalid Credentials");
    return res.redirect("/login");
  }
  req.session.user = user;
  return res.redirect("/");
});


module.exports = router;