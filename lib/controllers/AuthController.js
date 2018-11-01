const {User} = require('../models')
const jwt = require("jsonwebtoken")
const config = require('../config')

function jwtSign(user){
  const ONE_WEEK = 60*60*24*7
  return jwt.sign(user,config.authencation.jwtSecret,{
    expiresIn: ONE_WEEK
  })

}


module.exports = {
  async register(req,res) {
        try{

        console.log(req.body); 
        const user = await User.create(req.body).catch()
        res.send(JSON.stringify(user));

        } catch (err) {
            res.status(400).send({
              error: err
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
        res.send({ user:userjson, token:jwtSign(userjson) });

    } 
    catch (err) {
        res.status(500).send({
          error: err
        })
    }
  } 
}