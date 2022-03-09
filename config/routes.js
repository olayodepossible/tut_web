const {check} = require('express-validator');
const homeController = require('../controllers/homeController');
const speakerController = require('../controllers/speakersController');
const feedbackController = require('../controllers/feedbackController');



const validationCheck = [
      check('name')
        .trim()
        .isLength({min: 3})
        .escape()
        .withMessage('A valid name is required'),
      check('email')
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage('A valid email address is required'),
      check('title')
        .trim()
        .isLength({min: 3})
        .escape()
        .withMessage('A title is required'),
      check('message')
        .trim()
        .isLength({min: 5})
        .escape()
        .withMessage('A message is required')
    ];

module.exports = (app) => {
  app.get('/', homeController.homePage);

  app.get('/speakers', speakerController.speakersPage);
  app.get('/speakers/:shortname', speakerController.speakerPageByShortName);
  app.get('/feedback', feedbackController.getFeedback);
  app.post('/feedback', validationCheck, feedbackController.postFeedback);
  app.post('/feedback/api', validationCheck, feedbackController.restFeedbackPost);
};
