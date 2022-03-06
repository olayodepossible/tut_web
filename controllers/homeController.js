const path = require('path');
const SpeakerService = require('../services/SpeakerService');

const speakerDataPath = path.resolve('data', 'speakers.json');
const speakerService = new SpeakerService(speakerDataPath);

module.exports.homePage = async (req, res) => {
  //   res.sendFile(path.join(__dirname, './static/index.html'));
  //   if (!req.session.visitcount) {
  //     req.session.visitcount = 0;
  //   }

  //   req.session.visitcount += 1;
  try {
    const speakers = await speakerService.getList();
    const artworks = await speakerService.getAllArtwork();
    res.render('layout', {
      pageTitle: 'Welcome',
      template: 'index',
      speakers,
      artworks,
    });
  } catch (error) {
    console.log(`An Error occur -- ${error}`);
  }
};
