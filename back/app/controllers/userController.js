
const userController= {
    subscribe: async function(request, response) {
        return response.json({"user-subscribe": "ok"})
    },
}

module.exports= userController;