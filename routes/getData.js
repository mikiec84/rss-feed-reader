const axios = require('axios');
const cheerio = require('cheerio');
const firebaseData = require('./dataFromFirebase.js');


const getDataFromUrl = (url) => {
  return new Promise((resolve, reject) => {
    axios.get(url).then(response => {
      const data = getDataFromCheerio(response.data);
      resolve(data);
    })
  });
}

const getDataFromCheerio = (data) => {

  $ = cheerio.load(data, {
    xmlMode: true
  })

  const posts = [];
  const maxItems = 10;

  let items = $('item');
  if (items.length > maxItems) items = items.slice(0, maxItems);
  items.each(function(i, el) {
    const title = $(this).find('title').text();
    const link = $(this).find('link').text();
    const date = $(this).find('pubDate').text();
    const fullContent = $(this).find('content\\:encoded').text();
    $$ = cheerio.load(fullContent, {
      xmlMode: false
    })
    let content = $$('p').first().text();
    if (content.length > 200) content = content.slice(0, 198).concat('...');
    posts.push({
      title,
      link,
      date,
      content
    })
  })

  return posts;

}

const getSourceDataFromCheerio = (data, url) => {
    $ = cheerio.load(data, {xmlMode: true});
    const title = $('title').first().text();
    const link = $('link').first().text();
    const description = $('description').first().text();
    const sourceData = {title, url, link, description};
    const items = $('item');
    if (items.length == 0) return null;
    return sourceData;
}


const addNewSourceFromUrl = (sourceUrl) => {
  return new Promise((resolve, reject) => {
    axios.get(sourceUrl).then(response => {
      const sourceData = getSourceDataFromCheerio(response.data, sourceUrl);
      if (sourceData == null) reject();
      else firebaseData.addNewSource(sourceData).then(result => resolve()).catch(error => reject());
    })
  })
}


module.exports.getDataFromUrl = getDataFromUrl;
module.exports.addNewSourceFromUrl = addNewSourceFromUrl;
