const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/playlist-voter'));

app.get('/*', (req,res,next) => {
    res.sendFile(path.join(__dirname + '/dist/playlist-voter/index.html'));
});


app.listen(process.env.PORT || 8000);