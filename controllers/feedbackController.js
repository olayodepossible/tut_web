const path = require('path');
const { validationResult} = require('express-validator');
const FeedbackService = require('../services/FeedbackService');
const SpeakerService = require('../services/SpeakerService');

const speakerDataPath = path.resolve('data', 'speakers.json');
const speakerService = new SpeakerService(speakerDataPath);

const feedbackDataPath = path.resolve('data', 'feedback.json');
const feedbackService = new FeedbackService(feedbackDataPath);

module.exports.getFeedback = async (req, res) => {
  try {
    const speakers = await speakerService.getList();
    const feedbacks = await feedbackService.getList();
    const errors = req.session.feedback? req.session.feedback.err : false;
    const successMessage = req.session.feedback? req.session.feedback.message : false;
    
    req.session.feedback= {}
    return res.render('layout', {
      pageTitle: 'Feedback',
      template: 'feedback',
      feedbacks,
      speakers,
      errors,
      successMessage
    });
  } catch (error) {
    console.log(`An Error occur -- ${error}`);
    return error;
  }
};



module.exports.postFeedback = async (req, res) => {
 
  try {
     
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.session.feedback = { err: errors.array()};
      return res.redirect('/feedback');
    }
    const {name, email, title, message} = req.body;
    await feedbackService.addEntry(name, email, title, message)
    req.session.feedback = { message: "Thank for your feedback"};
    return res.redirect('/feedback');
  
  } catch (error) {
    console.log(`An Error occur -- ${error}`);
    return error;
  }
};


module.exports.restFeedbackPost = async (req, res) => {
 
  try {
     
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.session.feedback = { err: errors.array()};
      return res.json({erros: errors.array()});
    }
    const {name, email, title, message} = req.body;
    await feedbackService.addEntry(name, email, title, message)
    const feedback = await feedbackService.getList();
    return res.json({feedback, successMessage: "Thank for your feedback"});
  
  } catch (error) {
    console.log(`An Error occur -- ${error}`);
    return error;
  }
};





 