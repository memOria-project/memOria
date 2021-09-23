const {Pool} = require("pg")

const config= {
    connectionString: process.env.DATABASE_URL
};

if (process.env.NODE_ENV === "production" ) {
    //config pour la version de prod sur héroku, 
    // ça évitera des messages d'erreur
    config.ssl= {
        rejectUnauthorized: false
    };
}

const pool = new Pool(config)
module.exports = pool;
