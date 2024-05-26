module.exports = async function (req, res, next) {
  if (req.session && req.session.user && req.session.user.role === 'admin') {
    next(); 
  } else {
    res.flash('danger', 'You are not authorized to view this page. Please login as an admin');
    res.redirect('/login');
  }
};