const AuthController = require('./controllers/AuthController')
const AuthPollicy = require('./pollicy/AuthPollicy')

module.exports = (app)=> {

    app.get('/', function (req, res, next) {
        res.send("Hello World!");
    })
    
    app.post("/register", AuthPollicy.register, AuthController.register)

    app.post("/login", AuthController.login)
}