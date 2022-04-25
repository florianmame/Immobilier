const express = require('express');
const app = express();
const path = require('path');
const JwtService = require('./src/services/jwtService.js');
require('dotenv').config()


//--------------------------------------------------------------------
//      Mise en place du moteur de template
//--------------------------------------------------------------------
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');

//--------------------------------------------------------------------
//      Ajout du midlleware express session
//--------------------------------------------------------------------
const session = require('express-session');
app.use(session({
    secret: process.env.APP_KEY, resave:false, saveUninitialized:false, 
    cookie: {maxAge: 3600000} 
}));

//--------------------------------------------------------------------
//      Ajout du midlleware express flash messages
//--------------------------------------------------------------------
const flash = require('express-flash-messages');
app.use(flash());

// Récupérer la session grace au JWT
app.use('/', (new JwtService).connectWithJwt);
app.use('/admin', (new JwtService).connectAuthAdmin);

//--------------------------------------------------------------------
//      Envoie de variable(s) à PUG
//--------------------------------------------------------------------
app.use((req,res,next) => {
    res.locals.session = req.session;
    res.locals.route = req._parsedUrl.pathname;
    next();
});

//--------------------------------------------------------------------
//     Parse les données en POST
//--------------------------------------------------------------------
app.use(express.urlencoded({ extended: true }));

//--------------------------------------------------------------------
//      Mise en place du moteur du Middleware SASS
//--------------------------------------------------------------------
const sassMiddleware = require('node-sass-middleware');
app.use(sassMiddleware({
    /* Options */
    src: path.join(__dirname, 'build/'),
    dest: path.join(__dirname, 'public/'),
    debug: false,   // true pour voir les traitements effectués
    indentedSyntax: false, // true Compiles files with the .sass extension
    outputStyle: 'compressed'
}));

//--------------------------------------------------------------------
//      Mise en place du répertoire static
//--------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
 
//--------------------------------------------------------------------
//      Chargement des routes
//--------------------------------------------------------------------
require('./app/routes')(app);
 
//--------------------------------------------------------------------
//     Ecoute du serveur HTTP
//--------------------------------------------------------------------
app.listen(process.env.PORT, () => {
    if (process.env.APP_ENV == 'dev' && process.send) {  process.send('online'); }
    console.log(`Le serveur est démarré : http://localhost:${process.env.PORT}`);

});
