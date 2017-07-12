// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var url=require('url');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.
function getJson(unix,natural){
  var json=null;
  if(unix!==null && natural!==null){
    json={
    unix:unix,
    natural:natural
  };
  }
  if(unix===null && natural===null){
    json={
    unix:unix,
    natural:natural
  };
  }
  return json;
}
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/*", function (request, response) {
  var parsedUrl=url.parse(request.url, true);
  console.log("parsed url=="+parsedUrl);
  var path=parsedUrl.pathname;
  var re=/%20/gi;
  path=path.replace("/","");
  var json=null;
  var pathParameter=path.replace(re," ");
  if(isNaN(pathParameter)===false)
    {
      
       pathParameter=Number(pathParameter);
      json=getJson(pathParameter,new Date(pathParameter));
    }
  else
    {
      var unixtime = new Date().parse(pathParameter).getTime()/1000
      json=getJson(new Date(pathParameter),pathParameter);
    }
  console.log("Replaced Path=="+path);
  if((new Date(pathParameter)).getTime() > 0)
    {
       response.json(json);
    }
  else
    {
       json=getJson(null,null);
       response.json(json);
    }
  //
  //response.end(__dirname + '/views/index.html');
  
});

app.get("/dreams", function (request, response) {
  
  response.send(dreams);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
