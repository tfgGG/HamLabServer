var AsyncRedis  = require('./AsyncRedis')
exports = module.exports = function(io,client){
    
  io.on('connection', function (socket) {
       
     /* socket.on('Matching', (data)=>{
         client.lpush("mylist",data.username)
         console.log("Matching in io")
         socket.join('test')
         
         //io.to('test').emit("send",{"test": data.username+"has join!"})
         socket.broadcast.emit("send",{"test": data.username+"has join!"})
      });*/


      socket.on("Starting",(room)=>{
        var all = [
            {
                "ques": "1. 請問答案是多少",
                "ans": 1,
                "options" : ["我是答案!!","我不是答案","我不是答案","我不是答案"]
            },
            {
                "ques": "2. 請問答案是多少",
                "ans": 1,
                "options" : ["我是答案!!","我不是答案","我不是答案","我不是答案"]
            },
                           {
                "ques": "3. 請問答案是多少",
                "ans": 3,
                "options" : ["我不是答案","我不是答案","我是答案!!","我不是答案"]
            },
            {
                "ques": "4. 請問答案是多少",
                "ans": 4,
                "options" : ["我不是答案","我不是答案","我不是答案","我是答案!!"]
            },
                           {
                "ques": "5. 請問答案是多少",
                "ans": 4,
                "options" : ["我不是答案","我不是答案","我不是答案","我是答案!!"]
            },
            {
                "ques": "6. 請問答案是多少",
                "ans": 2,
                "options" : ["我不是答案","我是答案!!","我不是答案","我不是答案"]
            },
            {
                "ques": "7. 請問答案是多少",
                "ans": 3,
                "options" : ["我不是答案","我不是答案","我是答案!!","我不是答案"]
            },
            {
                "ques": "8. 請問答案是多少",
                "ans": 1,
                "options" : ["我是答案!!!","我不是答案","我不是答案","我不是答案"]
            },

      ]
        var questions=[]  
        socket.join(room)
        console.log(room)
        if(io.sockets.adapter.rooms[room].length == 2)
        {
            //client sunionstore game:1:deck deck
            client.set("status_"+room,0) // Set record data for Game
            questions = all.sort((a,b)=>Math.random()-0.5).slice(4)
            console.log(room +":number two joined")
            io.to(room).emit("Permission",{"data":"Yes","questions":questions})
        }
        
       })

       socket.on("Choose",(data,room)=>{
            client.incr("status_"+room)
            data.socketid = socket.id
            AsyncRedis.getkey("status_"+room).then((d)=>{

                client.hmset(room + "_" + d, data)
                var m = client.multi()
                if( d == 2)
                {
                    console.log("Inside")
                    m.hgetall(room + "_1")
                    m.hgetall(room + "_2")
                    m.exec((err, results)=>{
                        console.log(room)
                        console.log(results);
                        io.to(room).emit("FinishChoosen",results)
                    });
                    
                    client.set("status_"+ room, 0)
                }else{
                    socket.broadcast.to(room).emit("Next",data)
                }
                
            })
            
                  
       })

       socket.on("End",(room)=>{
            socket.leave(room)
            client.del(room+"_1")
            client.del(room+"_2")
            client.del("status_"+room)
       })


    });
}
