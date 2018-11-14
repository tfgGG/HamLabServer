const path = require('path')
module.exports  = {
    db:{
        database:process.env.DATABASE_URL|| "hamlab",
        protocal:'mysql',
        username:　process.env.DB_USER || "root",
        password:process.env.DB_PASS || "root",
        options:{
            dialect:process.env.DIALECT || "mysql",
            host: process.env.HOST　|| 'localhost',
        }
    },
    authencation:{
        jwtSecret : process.env.JWT_SECRET || 'secret'
    }
}