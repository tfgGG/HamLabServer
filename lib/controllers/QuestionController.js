const { Question } = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = {
    async index(req,res) {
        try{
            var ind = []
            var finalques = []
            // Generate random numbers for geting questions
            while(ind.length < 6){
                //TODO: Find the last index
                const temp = Math.floor((Math.random() * 8) + 1)
                const repeat = ind.find((ele)=>{
                    return ele == temp
                })
                // Dont push number if duplicate random number
                if(repeat == undefined)
                    ind.push(temp);
            }
            console.log(ind)
            const ques = await Question.findAll({
                // WHERE questionid IN [1,2,3] 
                where:{
                    questionid:{ [Op.in]:ind } 
                }
            })
            //Add "options" attribute for frontend rendering purpose 
            ques.forEach(element => {
                element.dataValues.options = []
                element.dataValues.options.push(element.opa)
                element.dataValues.options.push(element.opb)
                element.dataValues.options.push(element.opc)
                element.dataValues.options.push(element.opd)
                finalques.push(element.dataValues)                
            });
        }
        catch(err){
            res.status(500).send({
                error:"An fetch Question error had occur"
            })
        }
        try{
            res.send(finalques)
        }catch(err){
            return finalques
        }
    },
    async insert(req, res) {
        var json = require("../models/question.json")
        //Deleting all questions and add new from question.json file
        Question.destroy({
            where: {},
            truncate: true
        })
        try{
            json.q.forEach((element) => {
                const ques =  Question.create(element)
            });
            res.status(200).send("Success")
        }
        catch(err) {
            res.status(500).send({
                error: err
            })
        }
    }
}