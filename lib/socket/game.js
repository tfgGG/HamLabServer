exports = module.exports = function(io,client){
    
  io.on('connection', function (socket) {

      socket.on('Matching', (data)=>{
         client.lpush("mylist",data.username)
         //client.set("key", data.username);
         //client.get("key", function(err, reply) {
          // reply is null when the key is missing
          //console.log(reply);
          //});
         console.log("Matching in io")
         socket.broadcast.emit("send",{"test": "success"})
         //
      });

    });
}
