var AsyncRedis  = require('./AsyncRedis')
var QuestionController = require('../controllers/QuestionController')
exports = module.exports = function(io,client){
    
  io.on('connection', function (socket) {

      socket.on("Starting",async(room)=>{
        var questions=[]  
        socket.join(room)
        console.log(room)
        if(io.sockets.adapter.rooms[room].length == 2)
        {
            const time = setTimeout(()=>{
                io.to(room).emit("Permission",{"data":"No","questions":{}})
            },5000)
            var questions = await QuestionController.index()
            clearTimeout(time)
            console.log(questions)
            //client sunionstore game:1:deck deck
            client.set("Status_"+room,0) // Set record data for Game
            client.set("Status_Control"+room,0) // Set record data for Game
            console.log(room +" number two joined")
            
            io.to(room).emit("Permission",{"data":"Yes","questions":questions})
        }
        
       })

       socket.on("Choose",(data,room)=>{
            client.incr("Status_"+ room)
            data.socketid = socket.id
            AsyncRedis.getkey("Status_"+room).then((d)=>{

                client.hmset(room + "_" + d, data)
                var m = client.multi()
                var room_1 = null;
                //Both Player Choose with in time
                if( d == 2)
                {
                    console.log("Inside" + room)
                    m.hgetall(room + "_1")
                    m.hgetall(room + "_2")
                    m.exec((err, results)=>{
                        room_1 = results;
                        console.log(results);
                        //Broadcast to both users, show answers
                        io.to(room).emit("FinishChoosen",results) 
                    });
                    client.set("Status_"+ room, 0)
                }
                //Only One player chooses 
                else if ( d==1 && data == null)
                {
                    console.log(room_1)
                    io.to(room).emit("FinishChoosen", room_1)
                }//
                else if(d == 1 && data != null){
                    //Emit Except Sender, Show that other user has choose an answer
                    socket.broadcast.to(room).emit("Next",data) 
                }
                //No Player has choose an answer
                else{
                    io.to(room).emit("FinishChoosen",{}) 
                }
                
            })                     
       })

       socket.on("FinishUpdateScore",(room,status)=>{
            client.incr("Status_Control"+room)
            AsyncRedis.getkey("Status_Control"+room).then((d)=>{         
                if(d== 2)
                {
                    console.log("Inside: Ready to Update")
                    client.set("Status_Control"+ room, 0)
                    io.to(room).emit("ChangeToNext",2)
                }
            })                  
       })

       socket.on("End",(room)=>{
            socket.leave(room)
            client.del(room+"_1")
            client.del(room+"_2")
            client.del("Status_"+room)
            client.del("Status_Control"+room)
       })

    });
}
