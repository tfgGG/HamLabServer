
module.exports = (sequelize,DataTypes)=> {
    const Item = sequelize.define('Item',{
        itemid:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        pic:DataTypes.STRING,
        name:DataTypes.STRING,
        points:DataTypes.INTEGER,
        answer:DataTypes.INTEGER,
        time:DataTypes.INTEGER,
        discription: DataTypes.STRING
    },{
        hooks:{
            //beforeCreate:hashPass,
            //beforeUpdate:hashPass,
        }
    })
    return Item
}

//User.belongsTo(Company, {foreignKey: 'fk_companyname', targetKey: 'name'});