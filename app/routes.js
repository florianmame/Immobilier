module.exports = (app) => {
    //route Home
    app.get('/', (req, res) => {
        let Home = require('../src/controllers/Home.js');
        (new Home()).print(req, res);
    });

    // methode get du formulaire d'inscription
    app.get('/inscription', (req, res) => {
        let Register = require('../src/controllers/Register.js');
        (new Register()).print(req, res);
    });

    // methode post du formulaire d'inscription
    app.post('/inscription', (req, res) => {
        let Register = require('../src/controllers/Register.js');
        (new Register()).process(req, res);
    });

    // methode get connexiion authentification
    app.get('/connexion', (req, res) => {
        let Authenticated = require('../src/controllers/Authenticated.js');
        (new Authenticated()).print(req, res);
    });

    // methode post du formulaire de connexion
    app.post('/connexion', (req, res) => {
        let Authenticated = require('../src/controllers/Authenticated.js');
        (new Authenticated()).process(req, res);
    });
    
    // methode get de la déconnexion
    app.get('/deconnexion', (req, res) => {
        let Authenticated = require('../src/controllers/Authenticated.js');
        (new Authenticated()).disconnect(req, res);
    });

    //-------------------------------------------------------------------
    //          routes administration
    //-------------------------------------------------------------------
    app.get('/admin', (req, res) => {
        let Dashboard = require('../src/controllers/Dashboard.js');
        (new Dashboard()).print(req, res);
    });

    app.get('/admin/realty', (req, res) => {
        let Realty = require('../src/controllers/Realty.js');
        (new Realty()).print(req, res);
    });
 
    app.get('/admin/realty/add', (req, res) => {
        let Realty = require('../src/controllers/Realty.js');
        (new Realty()).printForm(req, res);
    });

    app.post('/admin/realty/add', 
        require('express-fileupload')({createParentPath: true}),
        require('../src/services/LcParserService.js'),
        (req, res) => {
            let Realty = require('../src/controllers/Realty.js');
            (new Realty()).processForm(req, res);
    });

    app.get('/admin/realty/edit/:id', 
        require('express-fileupload')({createParentPath: true}),
        require('../src/services/LcParserService.js'), 
        (req, res) => {
            let Realty = require('../src/controllers/Realty.js');
            (new Realty()).printForm(req, res);
    });

    app.post('/admin/realty/edit/:id', (req, res) => {
        let Realty = require('../src/controllers/Realty.js');
        (new Realty()).processForm(req, res);
    });

    app.get('/admin/realty/delete/:id', (req, res) => {
        let Realty = require('../src/controllers/Realty.js');
        (new Realty()).delete(req, res);
    });

};


