require('../../app/database.js');
const mongoose = require('mongoose');
const UserSchema = require('./UserSchema.js');

module.exports = class User {
    constructor() {
        this.db = mongoose.model('User', UserSchema); 
    }
    
    emailExists(email) {
        return new Promise((resolve, reject) => {
            this.db.findOne({ email }, (err, user) => {
                // si pas d'erreur, email trouvé
                if (!err && user !== null) {
                   resolve(true);
                }  
                resolve(false);
            })
        })
    }
    
    getUserByEmail(email) {
        return new Promise((resolve, reject) => {
            this.db.findOne({ email }, (err, user) => {
                // si pas d'erreur, email trouvé
                if (!err && user !== null) {
                   resolve(user);
                }  
                reject(false);
            })
        })
    }

    find(search = {}) {
        return new Promise((resolve, reject) => {
            this.db.find(search, function (err, user) {
                if (err) reject(err);
                resolve(user);
            });
        });
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            this.db.findById(id, function (err, user) {
                if (err || user === null) reject();
                resolve(user);
            });
        });
    }

    add(userEntity) {
        return new Promise((resolve, reject) => {
            this.db.create(userEntity, function (err, user) {
                if (err) reject(err);
                resolve(user);
            });
        });
    }



    edit(id, entity) {
        return new Promise((resolve, reject) => {
            this.db.findOneAndUpdate({_id:id}, entity, function (err, data) {
                if (err) reject(err);
                resolve(data);
            });
        });
    }

    delete(filter = {}) {
        return new Promise((resolve, reject) => {
            this.db.deleteOne(filter, function (err) {
                if (err) reject(err);
                resolve();
            });
        });
    }

} 