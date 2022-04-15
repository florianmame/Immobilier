const mongoose = require('mongoose');
mongoose.connect(
    'mongodb+srv://admin:Florian@cluster0.kaqzc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
    {connectTimeoutMS : 3000, socketTimeoutMS: 20000, useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.once('open', () => {
   console.log(`connexion OK !`);
});
