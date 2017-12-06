const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = express.Router();
const getData = require('./getData.js');
const firebaseData = require('./datafromFirebase.js');


router.get('/sources', function(req, res, next) {
  firebaseData.getSources().then(result => res.json(result)).catch(error => res.status(400).send());
});

router.get('/source/:sourceId', function(req, res, next) {
  firebaseData.getSourceFromId(req.params.sourceId).then(result => {
    getData.getDataFromUrl(result.url).then(data => res.json({title: result.title, posts: data})).catch(error => res.status(400).send());
  }).catch(error => res.status(400).send());
});

router.post('/sources', function(req, res, next) {
  getData.addNewSourceFromUrl(req.body.url).then(result => res.status(200).send()).catch(error => res.status(400).send());
})

router.delete('/sources/:sourceId', function(req, res, next) {
  firebaseData.deleteSource(req.params.sourceId).then(result => res.status(200).send()).catch(error => res.status(400).send());
})


router.get('/favorites', function(req, res, next) {
  firebaseData.getFavorites().then(result => res.json(result)).catch(error => res.status(400).send());
})

router.post('/favorites', function(req, res, next) {
  firebaseData.addNewFavorite(req.body).then(result => res.status(200).send()).catch(error => res.status(400).send());
})

router.delete('/favorites/:favoriteId', function(req, res, next) {
  firebaseData.deleteFavorite(req.params.favoriteId).then(result => res.status(200).send()).catch(error => res.status(400).send());
})


router.get('/saved', function(req, res, next) {
  firebaseData.getSaved().then(result => res.json(result)).catch(error => res.status(400).send());
})

router.post('/saved', function(req, res, next) {
  firebaseData.addNewSaved(req.body).then(result => res.status(200).send()).catch(error => res.status(400).send());
})

router.delete('/saved/:savedId', function(req, res, next) {
  firebaseData.deleteSaved(req.params.savedId).then(result => res.status(200).send()).catch(error => res.status(400).send());
})


module.exports = router;
