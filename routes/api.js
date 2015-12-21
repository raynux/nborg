'use strict';
const stream       = require('stream');
const router       = require('express').Router();
const oxford       = require('project-oxford');

const oxfordClient = new oxford.Client(process.env.OXFORM_FACE_APIKEY);

router.get('/', (req, res, next) => {
  res.send('I am /api');
});

router.post('/analyze', (req, res, next) => {
  // Creating a stream for posted based64-encoded iamge
  const data = req.body.image.split(',')[1];  // removing 'data:image/jpeg;base64,'
  const decodedImage = new Buffer(data, 'base64');
  const rs = new stream.Readable();
  rs.push(decodedImage);
  rs.push(null);

  // Go!
  oxfordClient.face.detect({
    stream: rs,
    analyzesAge: true,
    analyzesGender: true,
    analyzesSmile: true
  }).then((response) => {
    res.json(response);
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err);
  });
});

module.exports = router;
