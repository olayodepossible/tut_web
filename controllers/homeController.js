module.exports.homePage = (req, res) => {
  //   res.sendFile(path.join(__dirname, './static/index.html'));
  //   if (!req.session.visitcount) {
  //     req.session.visitcount = 0;
  //   }

  //   req.session.visitcount += 1;
  res.render('layout', { pageTitle: 'Welcome', template: 'index' });
};
