const path = require('path');
const SpeakerService = require('../services/SpeakerService');

const speakerDataPath = path.resolve('data', 'speakers.json');
const speakerService = new SpeakerService(speakerDataPath);

module.exports.speakersPage = async (req, res) => {
  try {
    const speakers = await speakerService.getList();
    res.render('layout', {
      pageTitle: 'Speakers',
      template: 'speakers',
      speakers,
    });
  } catch (error) {
    console.log(`An Error occur -- ${error}`);
  }
};

module.exports.speakerPageByShortName = async (req, res) => {
  const { shortname } = req.params;
  try {
    const speaker = await speakerService.getSpeaker(shortname);
    res.render('layout', {
      pageTitle: 'Speakers',
      template: 'speakers-details',
      speaker,
    });
  } catch (error) {
    console.log(`An Error occur -- ${error}`);
  }
};
