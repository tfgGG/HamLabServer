const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPass(user,options){
    const SALT_FACTOR = 8

    if(!user.changed('password')){
        return;
    }

    return bcrypt.genSaltAsync(SALT_FACTOR)
                .then(salt => bcrypt.hashAsync(user.password,salt,null))
                .then(hash => {
                    user.setDataValue('password',hash)
                })
}

module.exports = (sequelize,DataTypes)=> {
    const User = sequelize.define('User',{
        email:{
            type:DataTypes.STRING,
            unique:true
        },
        password:DataTypes.STRING
    },{
        hooks:{
            beforeCreate:hashPass,
            beforeUpdate:hashPass,
        }
    })

    User.prototype.comparePass = function(password) {
        console.log(this.password)
        console.log(password)
        return bcrypt.compareAsync(password, this.password)
    }

    return User
}