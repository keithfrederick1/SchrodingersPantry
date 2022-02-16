const express = require('express');
const path = require('path');
//const getYoutubeVids = require('server/helpers/youtube.js');

const app = express();
const DIST_DIR = path.resolve(__dirname, '..', 'dist');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(DIST_DIR));

const PORT = 4000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));


