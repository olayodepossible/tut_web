const homeController = require('../controllers/homeController');
const speakerController = require('../controllers/speakersController');
const feedbackController = require('../controllers/feedbackController');

module.exports = (app) => {
  app.get('/', homeController.homePage);

  app.get('/speakers', speakerController.speakersPage);
  app.get('/speakers/:shortname', speakerController.speakersPage);
  app.get('/feedback', feedbackController.feedbackPage);
};
