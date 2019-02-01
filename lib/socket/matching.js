var AsyncRedis  = require('./AsyncRedis')
var jwt = require('jsonwebtoken')
exports = module.exports = function(io,client){
    
  var mio =io.of('/matchio')
  var roomnum = "awdf"
  setInterval(()=>{
          
    client.llen("mylist",(err,results)=>{
      if(results>=2)
      {
         // client.lrange("mylist",0,-1,function(err,results){
        //  console.log(results)
        //})
        var m = client.multi()
        m.lpop('mylist')
        m.lpop('mylist')
        m.exec(function(err,results){
          
          roomnum = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
          console.log(results)
          console.log(roomnum)
          mio.to(results[0]).emit("send",roomnum)
          mio.to(results[1]).emit("send",roomnum)
        })
      }else{
        console.log("No matching")
      }
    })
    
  },8000)    

  mio.on('connection', function (socket) {

        console.log("Mio Onconnection"+ socket.id)
        socket.on('Matching',(data)=>{
          client.rpush('mylist',socket.id)
        })
  });
}
