const User= require("../models/user")
const jwt = require('../services/jwt')
const userController= {

    getOneUser: async function(request, response) {

        try {
            const user= await User.findOne(request.userId);
            response.status(200).json(user)
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message)
        }
    },

    login: async function(request, response) {

        try {
            const user = await new User(request.body).Login();
            response.setHeader('Authorization', jwt.makeToken(user.id));
            response.status(200).json(user);
        } catch(error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    },


}

module.exports= userController;