const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize')
const config = require('../config'); 
const db ={};

const sequelize = null;
if(process.env.DATABASE_URL != null)
{
    console.log("Using Postgres")
    this.sequelize = new Sequelize(
        process.env.DATABASE_URL,
        {
            dialect:'postgres',
            protocol:'postgres',
            dialectOptions:{
                ssl : true
            }
        }
    ) 
}else{
    console.log("Using Local Database MySQL")
    this.sequelize = new Sequelize(
        config.db.database,
        config.db.username,
        config.db.password,
        config.db.options
    )
}
// Read all model file(except index.js) and load into sequelize
fs.readdirSync(__dirname).filter( (file)=> file!=='index.js'&& file!=="question.json" && file!=="item.json")
.forEach( (file)=>{
    const model = this.sequelize.import(path.join(__dirname,file)) 
    db[model.name]=model 
})

db.sequelize = this.sequelize
db.Sequelize = Sequelize

module.exports = db