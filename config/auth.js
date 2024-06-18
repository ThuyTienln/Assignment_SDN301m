const User = require('../models/member');

module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error", "Please log in first!");
    res.redirect("/users");
  },

  ensureAdmin: function (req, res, next) {
    if (req.isAuthenticated() && req.user.isAdmin) {
      return next();
    }
    req.flash("error", "Only admin!");
    res.redirect("/users");
  },
};
