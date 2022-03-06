const path = require('path');
const SpeakerService = require('../services/SpeakerService');

const speakerDataPath = path.resolve('data', 'speakers.json');
const speakerService = new SpeakerService(speakerDataPath);

module.exports.speakersPage = async (req, res) => {
  try {
    const speakers = await speakerService.getList();
    const artworks = await speakerService.getAllArtwork();
    res.render('layout', {
      pageTitle: 'Speakers',
      template: 'speakers',
      speakers,
      artworks,
    });
  } catch (error) {
    console.log(`An Error occur -- ${error}`);
  }
};

module.exports.speakerPageByShortName = async (req, res) => {
  const { shortname } = req.params;
  try {
    const speakers = await speakerService.getList();
    const speaker = await speakerService.getSpeaker(shortname);
    const artworks = await speakerService.getArtworkForSpeaker(shortname);
    res.render('layout', {
      pageTitle: 'Speaker',
      template: 'speakers-details',
      speakers,
      speaker,
      artworks,
    });
  } catch (error) {
    console.log(`An Error occur -- ${error}`);
  }
};
