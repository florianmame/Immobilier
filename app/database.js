const mongoose = require('mongoose');
mongoose.connect(
    'mongodb+srv://admin:Florian@cluster0.kaqzc.mongodb.net/immo', 
    {connectTimeoutMS : 3000, socketTimeoutMS: 20000, useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.once('open', () => {
    console.log(`connexion OK !`);
});