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
            const {rows} = await db.query('SELECT id, name, email FROM "user" WHERE id=$1', [id]);
            if (rows[0]) {
                const  { id, name, email } = rows[0]
                return new User({
                    id, 
                    name, 
                    email
                });
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
            const query = {
                text: 'SELECT * FROM "user" WHERE "email"=$1',
                // text: 'SELECT "user".id, "name", email, "password",  array_agg(deck.id) AS decks FROM "user" JOIN "deck" ON "user_id" = "user".id WHERE "email"=$1 GROUP BY "user".id, "name", email',
                values: [this.email],
            }
            const {rows} = await db.query(query);
            if (!rows[0]) {
                throw new Error("Identifiant ou mot de passe inconnu");
            }
            const isValid = await bcrypt.compare(this.password, rows[0].password);

            if (!isValid) {
                throw new Error('Identifiant ou mot de passe inconnu');
            }
            this.id = rows[0].id;
            this.name = rows[0].name;
            this.email = rows[0].email;
            return {id: this.id, name: this.name, email:this.email};
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