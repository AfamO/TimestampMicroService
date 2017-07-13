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
  if(pathParameter!==null && pathParameter!=="")
    {
       if(isNaN(pathParameter)===false)
    {
      var unix_timestamp=Number(pathParameter);
      var date = new Date(unix_timestamp*1000), year = date.getFullYear(),
    month = (date.getMonth() + 1).toString(),
    formatedMonth = (month.length === 1) ? ("0" + month) : month,
    day = date.getDate().toString(),
    formatedDay = (day.length === 1) ? ("0" + day) : day,
    hour = date.getHours().toString(),
    formatedHour = (hour.length === 1) ? ("0" + hour) : hour,
    minute = date.getMinutes().toString(),
    formatedMinute = (minute.length === 1) ? ("0" + minute) : minute,
    second = date.getSeconds().toString(),
    formatedSecond = (second.length === 1) ? ("0" + second) : second;
      var formattedDateTime = year+ "-" + formatedMonth + "-" + formatedDay + " " + formatedHour + ':' + formatedMinute+':'+formatedSecond;
      json=getJson(pathParameter,formattedDateTime);
    }
  else
    {
      var unixtime = new Date(pathParameter).getTime()/1000
      json=getJson(unixtime,pathParameter);
    }
       response.json(json);
    }
  else
    {
       
       json=getJson(null,null);
       response.json(json);
 }
  //response.end(__dirname + '/views/index.html');
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
