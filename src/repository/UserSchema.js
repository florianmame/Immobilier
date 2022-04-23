const mongoose = require('mongoose');
module.exports =  mongoose.Schema({
    email : {  type: String },
    password : { type: String },
    civility : {type: String, match: /^[1-2]{1}$/},
    firstname: { type: String },
    lastname: { type: String },
    phone: { type: String },
    roles: { type: Array },
    date: { type: Date, default: Date.now }
}, { versionKey: false });