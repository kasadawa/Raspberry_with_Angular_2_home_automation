var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var port = 4444; 

  

app.set('views',path.join(__dirname,"/views"));
app.set('view engine','ejs');
app.engine('html',require ('ejs').renderFile);


app.use(express.static(path.join(__dirname,'/relay')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

var server = app.listen(port,()=>{
    console.log('server started on port '+ port);
})
//socket-io
var io = require('socket.io').listen(server);

module.exports = {
    io: io , 
    http : http , 
};

var ioTimer = require('./timer/timer');
var index = require('./routers/index');
app.use('/',index.router);
app.use(redirectUnmatched);


// redirecting to home if there is no router
function redirectUnmatched(req, res) {
  res.render('./index.html');
}
