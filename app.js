var express = require('express');
var centrpro = express();
var favicon = require('serve-favicon');
var request = require('request');
var fs = require('fs');

var KEY = 'AIzaSyCVAXiUzRYsML1Pv6RwSG1gunmMikTzQqY';
var CX = '013753918506466391726:hw47szr5hae';
var REQ_URL = 'https://www.googleapis.com/customsearch/v1element?' +
                'prettyPrint=false' +
                '&key=' + KEY +
                '&cx=' + CX;

centrpro.set('view engine', 'ejs');
centrpro.set('views', __dirname + '/views');

centrpro.use(favicon(__dirname + '/public/img/favicon.ico'));
centrpro.use(express.static(__dirname + '/public/'));

centrpro.get('/search', function(req, res, next) {
  var url;
  if (req.query.q) {
    url = REQ_URL;

    for (var i in req.query) {
      url = url + '&' + i + '=' + req.query[i];
    }

    request(url, function (err, response, body) {
      var para;

      if (!err && response.statusCode == 200) {
        para = JSON.parse(body);
        if (para.error) {
          res.render('index');
        } else {
          para.q = req.query.q;
          res.render('search', para);
        }

      } else {
        res.render('index');
      }
    });

  } else {
    res.render('index');
  }
});

centrpro.get(/^\/(index.html)?/, function(req, res) {
  res.render('index');
});

centrpro.listen(process.env.PORT || 80);
