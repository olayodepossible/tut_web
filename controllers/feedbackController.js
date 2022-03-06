const path = require('path');
const FeedbackService = require('../services/FeedbackService');
const SpeakerService = require('../services/SpeakerService');

const speakerDataPath = path.resolve('data', 'speakers.json');
const speakerService = new SpeakerService(speakerDataPath);

const feedbackDataPath = path.resolve('data', 'feedback.json');
const feedbackService = new FeedbackService(feedbackDataPath);

module.exports.feedbackPage = async (req, res) => {
  try {
    const speakers = await speakerService.getList();
    const feedbacks = await feedbackService.getList();
    return res.render('layout', {
      pageTitle: 'Feedback',
      template: 'feedback',
      feedbacks,
      speakers,
    });
  } catch (error) {
    console.log(`An Error occur -- ${error}`);
    return error;
  }
};
