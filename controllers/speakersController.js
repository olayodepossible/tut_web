const path = require('path');
const SpeakerService = require('../services/SpeakerService');

const speakerDataPath = path.resolve('data', 'speakers.json');
const speakerService = new SpeakerService(speakerDataPath);

module.exports.speakersPage = async (req, res) => {
  try {
    const speakers = await speakerService.getList();
    return res.json(speakers);
  } catch (error) {
    console.log(`An Error occur -- ${error}`);
    return res.error;
  }
};
