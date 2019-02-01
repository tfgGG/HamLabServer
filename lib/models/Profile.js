

module.exports = (sequelize,DataTypes)=> {
    const Profile = sequelize.define('Profile',{
        profileid:{
            type: DataTypes.UUID,
            primaryKey: true,
            unique:true,
        },
        win:DataTypes.INTEGER,
        loose:DataTypes.INTEGER,
        pic:DataTypes.STRING
    },{
        hooks:{
            //beforeCreate:hashPass,
            //beforeUpdate:hashPass,
        }
    })


    return Profile
}