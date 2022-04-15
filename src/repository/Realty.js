require('../../app/database.js');
const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const RealtySchema = require('./RealtySchema.js');
 
module.exports = class Realty {
    constructor() {
        this.db = mongoose.model('Realty', RealtySchema); 
    }
 
    add(entity) {
        return new Promise((resolve, reject) => {
            this.db.create(entity, function (err, data) {
                if (err) reject(err);
                resolve(data);
            });
        });
    }
} 