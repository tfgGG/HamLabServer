//var User = require("./User")()
module.exports = (sequelize,DataTypes)=> {
    const Profile = sequelize.define('Profile',{
        profileid:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        win:DataTypes.INTEGER,
        loose:DataTypes.INTEGER,
        money:DataTypes.INTEGER,
        item:DataTypes.STRING,
        pic:DataTypes.STRING
    },{
        hooks:{
            //beforeCreate:hashPass,
            //beforeUpdate:hashPass,
        }
    })

    Profile.associate = function (models) {
        Profile.belongsTo(models.User)
    }

    return Profile
}
