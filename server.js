var express = require('express');

var app = express()
var port = process.env.PORT || 28070;

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.redirect(200, "/index.html");
    
});

app.listen(port, function() {
    console.log("== Server is listening on port ", port);
});

