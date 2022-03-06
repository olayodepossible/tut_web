const path = require('path');
const FeedbackService = require('../services/FeedbackService');

const feedbackDataPath = path.resolve('data', 'speakers.json');
const feedbackService = new FeedbackService(feedbackDataPath);

module.exports.feedbackPage = async (req, res) => {
  try {
    const feedbacks = await feedbackService.getList();
    return res.json(feedbacks);
  } catch (error) {
    console.log(`An Error has occur == ${error}`);
    return res.error;
  }
};
