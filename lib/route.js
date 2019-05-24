const AuthController = require('./controllers/AuthController')
const ShopController = require('./controllers/ShopController')
const QuestionController = require('./controllers/QuestionController')
const AuthPollicy = require('./pollicy/AuthPollicy')

module.exports = (app)=> {

    app.get('/', function (req, res, next) {
        res.send("Hello World!");
    })
    
    app.post("/register", AuthPollicy.register, AuthController.register)

    app.post("/login", AuthController.login)

    app.get('/getItem',ShopController.index)
    
    app.post('/postItem', ShopController.post)

    app.get('/GET/defaultpic',AuthController.getpic)

    app.get('/GET/question',QuestionController.index)

    app.get('/GET/useritem/:uid',AuthController.getuserItem);

    app.get('/insert/question',QuestionController.insert)

    app.get('/insert/item',ShopController.insert)
}