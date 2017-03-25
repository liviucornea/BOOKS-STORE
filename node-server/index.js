var express = require('express'),
  path = require('path'),
  fs = require('fs');

var app = express();
var staticRoot = __dirname + '/';

app.set('port', (process.env.PORT || 3000));

app.use(express.static(staticRoot));

app.use(function(req, res, next){

  // if the request is not html then move along
  var accept = req.accepts('html', 'json', 'xml');
  if(accept !== 'html'){
    return next();
  }

  // if the request has a '.' assume that it's for a file, move along
  var ext = path.extname(req.path);
  if (ext !== ''){
    return next();
  }

  fs.createReadStream(staticRoot + 'index.html').pipe(res);

});

app.all('/api/bookslistInventories', function(req, res, next) {
  res.setHeader('content-type', 'application/json');
  res.sendFile('books.json', { root: __dirname  });
});

app.listen(app.get('port'), function() {
  console.log('app running on port', app.get('port'));
});
