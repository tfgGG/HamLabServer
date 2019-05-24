const {Item} = require('../models')

module.exports = {
    async insert(req,res){
        var json = require("../models/item.json")
        //Deleting all questions and add new from item.json file
        Item.destroy({
            where: {},
            truncate: true
        })
        try{
            json.q.forEach((element) => {
                const item =  Item.create(element)
            });
            res.status(200).send("Success")
        }
        catch(err) {
            res.status(500).send({
                error: err
            })
        }

    },
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