
var getAsync = null;
var getlist = null

module.exports ={

    setClient : function(asyncs) { 
        getAsync = asyncs
        console.log(getAsync)
    },
    async getkey(key){
        try{
            const res = await getAsync(key);
            //console.log(res)
            return res
        }catch(err){
            //console.log(err)
        }
        
    },
    async getlist(key){
        
    }
    
}