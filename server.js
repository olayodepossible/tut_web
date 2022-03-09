const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const creatError = require('http-errors');
const bodyParser = require('body-parser')
const router = require('./config/routes');

const app = express();

app.set('trust proxy', 1);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(
  cookieSession({
    name: 'session',
    keys: ['randomCharacter', 'RANDOMCHAR'],
  })
);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, './static')));

router(app);
app.use((req, res, next) => next(creatError(404, 'File not found')));
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  const status = err.status || 500;
  res.locals.status = status;
  res.status(status);
  res.render('errorPage');
});
const port = 2000;
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
