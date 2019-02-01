const {Item} = require('../models')

module.exports = {
    async index(req,res) {
        try{
            const songs = await Item.findAll({
                where:{}
            })
            res.send(songs)
        }
        catch(err){
            console.log(err)
            res.status(500).send({
                error:"An fetch Item error occur"
            })
        }
    },
    async post(req,res){
        try{
            const songs = await Item.create(req.body)
            res.send(songs)
        }
        catch(err){
            console.log(err)
            res.status(500).send({
                error:"An create Item error occur"
            })

        }
    }
}