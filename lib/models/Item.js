
module.exports = (sequelize,DataTypes)=> {
    const Item = sequelize.define('Item',{
        itemid:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name:DataTypes.STRING,
        points:DataTypes.INTEGER, // 效果新增的分數
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