# rss-feed-reader

RSS Feed Reader built with Express, React, Firebase, Cheerio, Bootstrap 4.


## Setup

#### Express
```bash
# install dependencies
npm install

# run server
nodemon

```

#### Webpack / React

Set the URL of the Express server as proxy in `client/webpack.dev.js`

```bash
# install dependencies
npm install

# run webpack dev server
npm start

# build bundle.js
npm run build
```

#### Firebase

Place your `serviceAccountKey.json` file in the `/routes` folder and set the URL of your Firebase database in `dataFromFirebase.js`




