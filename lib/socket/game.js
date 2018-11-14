var AsyncRedis  = require('./AsyncRedis')
exports = module.exports = function(io,client){
    
  io.on('connection', function (socket) {

      socket.on('Matching', (data)=>{
         client.lpush("mylist",data.username)
         console.log("Matching in io")
         socket.join('test')
         
         //io.to('test').emit("send",{"test": data.username+"has join!"})
         socket.broadcast.emit("send",{"test": data.username+"has join!"})
      });


      socket.on("Starting",(data)=>{
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
        socket.join('test')
        if(io.sockets.adapter.rooms['test'].length == 2)
        {
            //client sunionstore game:1:deck deck
            client.set("status_"+"test",2) // Set record data for Game
            questions = all.sort((a,b)=>Math.random()-0.5).slice(4)
            console.log("Number Two Joined")
            io.to('test').emit("Permission",{"data":"Yes","questions":questions})
        }
        
       })

       socket.on("Choose",function(data){

            client.incr("status_"+"test")
            console.log()
            data.socketid = socket.ID
            AsyncRedis.getkey("status_"+"test").then((d)=>{
                console.log("Outside:"+d)
                if( d == 4)
                {
                    console.log(d)
                    io.to('test').emit("FinishChoosen",data)
                    client.set("status_"+"test", 2)
                }else{
                    socket.broadcast.to('test').emit("Next",data)
                }
                
            })
            
                  
       })

       socket.on("End",(data)=>{

        
       })


    });
}
