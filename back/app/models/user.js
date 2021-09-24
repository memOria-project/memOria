const db = require('../database');
const bcrypt= require("bcrypt");

class User {
    constructor(obj = {}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    };

    
    
    static async findOne(id) {
        try {
            const {rows} = await db.query('SELECT * FROM "user" WHERE id=$1', [id]);
            if (rows[0]) {
                return new User(rows[0]);
            }
            throw new Error("Cet utilisateur n'existe pas");
        } catch(error) {
            if (error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    };

   

    async Login() {
        try {
            const {rows} = await db.query('SELECT * FROM "user" WHERE email=$1', [this.email]);

            if (!rows[0]) {
                throw new Error("Pas d'utilisateur trouvé ");
            }
            const isValid = await bcrypt.compare(this.password, rows[0].password);

            if (!isValid) {
                throw new Error('Mot de passe invalide');
            }
            this.id = rows[0].id;
            this.name = rows[0].name;
            return this;
        } catch(error) {
            console.log(error);
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    };

    
}
module.exports = User;