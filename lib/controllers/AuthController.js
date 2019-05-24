const {User,Profile,Item} = require('../models')
const jwt = require("jsonwebtoken")
const fs  = require('fs')
const config = require('../config')

function jwtSign(user){
  console.log("Inside jwt"+ user)
  const ONE_WEEK = 60*60*24*7
  var token = jwt.sign(user,'shhhhh')
  return token;
}


module.exports = {
  async register(req,res) {
        console.log("Inside Register")
        try{
        //console.log(req.body); 
        const user = await User.create(req.body).catch(req.body)
        console.log(user.dataValues.id)
        const profile = await Profile.create({
          UserId:user.dataValues.id,
          money:1000,
          win:0,
          loose:0,
          item:"[{id:1,num:4},{id:2,num:2},{id:3,num:5}]"
        })
        const userjson =JSON.stringify(user)
        return res.send({ user:userjson, token:jwtSign(userjson) });

        } catch (err) {
            res.status(400).send({
              error: 'This email account is already in use.'
            })
        }
  },
  async login(req,res) {
    try{
        const {email, password} = req.body
        
        const user = await User.findOne({ where: {email:email} })

        if(!user){
          return res.status(403).send({error: 'The Login information was incorrect'})
        }
        
        const isPasswordValid = await user.comparePass(password)
        console.log(isPasswordValid);  
        if(!isPasswordValid){
          return res.status(403).send({error:"The Login 403"})
        }

        const userjson =JSON.stringify(user)
        console.log("user"+userjson)
        return res.send({ user:userjson, token:jwtSign(userjson) });

    } 
    catch (err) {
        res.status(500).send({
          error: err
        })
    }
  },
  async getpic(req,res){
    const dirname = "/server/lib/img/"
    const arr = []
    fs.readdir(".."+dirname, function(err, filenames) {
      if (err) {
        console.log(err)
        return res.send("Error");
      }
      filenames.forEach(function(filename) {
          console.log(filename)
          arr.push("http://localhost:3000/"+dirname+filename)
      });
      return res.send({pic:arr})
    });
  },
  async getuserItem(req,res){

    try{
        const uid = req.params.uid
        var useritems = await Profile.findOne({where:{profileid:uid},attributes: ['item']})
        var items = await Item.findAll({where:{}})
        var newu = JSON.parse("["+useritems.item + "]")
        var mapuseritems = newu.map((elements)=>{
          var c  = items.find((ele)=>{
            return ele.itemid == elements.id
          })
          elements.content = c
          return elements;
        })
        return res.send(mapuseritems)
    }
    catch(err){
      res.status(500).send({
        error: err
      })
      console.log(err)
    }
  }
  
}