const express = require('express');
const app = express()
var http = require('http');
const https = require('https');
//const http = require('http').Server(app)
//var server = app.listen(app.get('port'))
var server = http.createServer(app).listen(3000);
var io = require('socket.io')(server);
server.listen(3000, function() {
    console.log('Listenging on port 3000');
});

const bodyParser = require('body-parser')
const morgan = require('morgan')
const {sequelize} = require('./lib/models/')
const cors=require('cors')
const config = require('./lib/config')

const client = require("redis").createClient(process.env.REDIS_URL);
//const Redis = require('ioredis')
//const url = require('url')
//const redis = new Redis(url.parse())

console.log(process.env.REDIS_URL)


app.set('port',process.env.PORT||3000);
app.use(bodyParser.json());   
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(cors()); 
/*
app.listen(app.get('port'),()=>{
    console.log("Working on http://localhost:"+ app.get('port')+"/");
});*/
require("./lib/route")(app)
require("./lib/socket/game")(io,client)

app.use(function(req,res){
    res.status(404);
    res.type('text/plain');
    res.send('404-NotFound');
})

app.get('/',function(req,res){
    res.send("Hello World")
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
});


sequelize.sync({force: false})
    .then(()=>{
        console.log("Server start working")
    })



/*
function test(){
    client.set("string key", "string val", redis.print);
    client.hset("hash key", "hashtest 1", "some value", redis.print);
    client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
    client.hkeys("hash key", function (err, replies) {
    console.log(replies.length + " replies:");
    replies.forEach(function (reply, i) {
         console.log("    " + i + ": " + reply);
     });
     client.quit();
   }); 
}*/