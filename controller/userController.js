//call model
const Users = require("../models/member");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const passport = require("passport");

class userController {
  register(req, res) {
    res.render("register", {
      title: "Register",
    });
  }
  registerPost(req, res, next) {
    const { username, password, name, YOB } = req.body;
    let errors = [];
    if (!username || !password || !name || !YOB) {
      errors.push({ msg: "Please enter all fields" });
    }
    if (password.length < 6) {
      errors.push({ msg: "Password must be at least 6 characters" });
    }
    if (errors.length > 0) {
      res.render("register", {
        errors,
        username,
        password,
        name, 
        YOB
      });
    } else {
      Users.findOne({ username: username }).then((user) => {
        if (user) {
          errors.push({ msg: "Username already exists" });
          res.render("register", {
            errors,
            username,
            password,
            name, 
            YOB
          });
        } else {
          const newUser = new Users({
            username,
            password,
            name, 
            YOB
          });
          //Hash password
          bcrypt.hash(newUser.password, 10, function (err, hash) {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                res.redirect("/users");
              })
              .catch(next);
          });
        }
      });
    }
  }

  login(req, res, next) {
    res.render("login");
  }

  signin(req, res, next) {
    passport.authenticate("local", {
      successRedirect: "/users/dashboard",
      failureRedirect: "/users",
      failureFlash: true,
    })(req, res, next);
  }
  dashboard(req, res, next) {
    Users.find({})
    .then((user) => {
      res.render('dashboard', {
        title: 'List',
        userData : user,
      })
    })
  }
  signout(req, res, next) {
    req.logout(function(err) {
      if (err) {return next(err);}
      req.flash("success_msg", "You are logged out");
      res.redirect("/users");
    });
  }
  deleteUser(req, res) {
    Users.findByIdAndDelete(req.params.userId)
    .then(() => {
      res.redirect("/dashboard");
    });
  }
  formEditUser(req, res) {
    let viewData = {};
    Users.findById(req.params.userId)
    .then((user) => {
      res.render('editDashboard', {
        userData: user
      })
    });
  }
  editUser(req, res) {
    Users.updateOne({ _id: req.params.userId }, req.body)
   .then(() => { res.redirect('/dashboard') })
  }
}

module.exports = new userController();
