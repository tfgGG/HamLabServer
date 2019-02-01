const express = require('express');
const app = express()
var http = require('http');
const https = require('https');

var server = http.createServer(app).listen(process.env.PORT||3000);
var io = require('socket.io')(server,{ origins: '*:*'});
const redisAdapter = require('socket.io-redis');


const {promisify} = require('util');

const bodyParser = require('body-parser')
const morgan = require('morgan')
const {sequelize} = require('./lib/models/')
const cors=require('cors')


//io.origins(['https://secret-coast-70665.herokuapp.com:*','http://localhost:8080/']);

app.set('port',process.env.PORT||3000);
app.use(bodyParser.json());   
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(cors()); 

var client = null
if(process.env.REDIS_URL != null){
    client = require("redis").createClient(process.env.REDIS_URL || 3000)
    io.adapter(redisAdapter(process.env.REDIS_URL))
}
else{
    client =  require("redis").createClient();
    io.adapter(redisAdapter({ host: 'localhost', port: 6379 }));
}
var getAsync = promisify(client.get).bind(client)
var redisasync = require('./lib/socket/AsyncRedis')
redisasync.setClient(getAsync)

/*
server.listen(app.get('port'), function() {
    console.log('Listenging on port'+ app.get('port'));
});*/

require("./lib/route")(app)
require("./lib/socket/game")(io,client)
require("./lib/socket/matching")(io,client)

app.use(function(req,res){
    res.status(404);
    res.type('text/plain');
    res.send('404-NotFound');
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