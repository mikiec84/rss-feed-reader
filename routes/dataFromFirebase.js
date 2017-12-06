const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

const config = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://-------.firebaseio.com"
}

!admin.apps.length ? admin.initializeApp(config) : admin.app();


const db = admin.database();
const sourcesRef = db.ref('sources');
const favoritesRef = db.ref('favorites');
const savedRef = db.ref('saved');


const getSources = () => {
  return new Promise((resolve, reject) => {
    sourcesRef.on('value', (data) => {
      const sourcesObj = data.val();
      if (!sourcesObj)
        return resolve([]);
      const keys = Object.keys(sourcesObj);
      const sources = [];
      for (let i = 0; i < keys.length; i++) {
        const obj = sourcesObj[keys[i]];
        sources.push({
          id: keys[i],
          title: obj.title,
          link: obj.link,
          description: obj.description,
          url: obj.url
        })
      }
      resolve(sources);
    }, (error) => reject())
  });
}

const getSourceFromId = (sourceId) => {
  return new Promise((resolve, reject) => {
    sourcesRef.child(sourceId).on('value', (snap) => {
      const value = snap.val();
      resolve({title: value.title, url: value.url});
    }, (error) => reject())
  })
}

const addNewSource = (source) => {
  return new Promise((resolve, reject) => {
    sourcesRef.push(source, (error) => error ? reject() : resolve());
  })
}

const deleteSource = (sourceId) => {
  return new Promise((resolve, reject) => {
    sourcesRef.child(sourceId).remove((error) => error ? reject() : resolve());
  })
}


const getFavorites = () => {
  return new Promise((resolve, reject) => {
    favoritesRef.on('value', (data) => {
      const favoritesObj = data.val();
      if (!favoritesObj)
        return resolve([]);
      const keys = Object.keys(favoritesObj);
      const favorites = [];
      for (let i = 0; i < keys.length; i++) {
        const obj = favoritesObj[keys[i]];
        const {content, date, link, title} = obj;
        favorites.push({
          id: keys[i],
          content,
          date,
          link,
          title
        });
      }
      resolve(favorites);
    }, (error) => reject())
  })
}

const addNewFavorite = (favorite) => {
  return new Promise((resolve, reject) => {
    favoritesRef.push(favorite, (error) => error ? reject() : resolve());
  })
}

const deleteFavorite = (favoriteId) => {
  return new Promise((resolve, reject) => {
    favoritesRef.child(favoriteId).remove((error) => error ? reject() : resolve());
  })
}


const getSaved = () => {
  return new Promise((resolve, reject) => {
    savedRef.on('value', (data) => {
      const savedObj = data.val();
      if (!savedObj)
        return resolve([]);
      const keys = Object.keys(savedObj);
      const saved = [];
      for (let i = 0; i < keys.length; i++) {
        const obj = savedObj[keys[i]];
        const {content, date, link, title} = obj;
        saved.push({
          id: keys[i],
          content,
          date,
          link,
          title
        });
      }
      resolve(saved);
    }, (error) => reject())
  })
}

const addNewSaved = (saved) => {
  return new Promise((resolve, reject) => {
    savedRef.push(saved, (error) => error ? reject() : resolve());
  })
}

const deleteSaved = (savedId) => {
  return new Promise((resolve, reject) => {
    savedRef.child(savedId).remove((error) => error ? reject() : resolve());
  })
}


module.exports.getSources = getSources;
module.exports.getSourceFromId = getSourceFromId;
module.exports.addNewSource = addNewSource;
module.exports.deleteSource = deleteSource;
module.exports.getFavorites = getFavorites;
module.exports.addNewFavorite = addNewFavorite;
module.exports.deleteFavorite = deleteFavorite;
module.exports.getSaved = getSaved;
module.exports.addNewSaved = addNewSaved;
module.exports.deleteSaved = deleteSaved;
