const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
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
app.use(express.static(path.join(__dirname, './static')));

router(app);

const port = 2000;
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
