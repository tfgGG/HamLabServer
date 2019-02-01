
module.exports = (sequelize,DataTypes)=> {
    const Question = sequelize.define('Question',{
        questionid:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        question:DataTypes.STRING,
        opa:DataTypes.STRING, // 效果新增的分數
        opb:DataTypes.STRING,
        opc:DataTypes.STRING,
        opd:DataTypes.STRING,
        ans:DataTypes.INTEGER
    },{
        hooks:{
            //beforeCreate:hashPass,
            //beforeUpdate:hashPass,
        }
    })
    Question.prototype.getMax = function(){
        return 100
    }

    return Question
}