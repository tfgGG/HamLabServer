const joi = require('joi')

module.exports ={

    register (req,res,next){

        const schema = {
            email: joi.string().email(),
            password:joi.string().regex(new RegExp('^[a-zA-Z0-9]{8,32}$'))
        }
        const {error} = joi.validate(req.body,schema)

        if(error)
        {
            switch(error.details[0].context.key)
            {
                case 'email':
                    res.status(400).send({ error:"You must have a valid email"})
                    break
                case 'password':
                    res.status(400).send({ error:"Password failed following rules"})
                    break
            }
            console.log("AuthPolicy.js"+ error)
            
        }
        else {
            console.log("AuthPolicy.js Pass Register")
            next()
        }

    }

}