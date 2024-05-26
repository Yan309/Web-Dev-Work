module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  } else {
    res.flash("danger", "Please login to access this page");
      return res.redirect("/login");
  }
};