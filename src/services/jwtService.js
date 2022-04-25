const jwt = require('jsonwebtoken');
const Cookies = require( "cookies" );

module.exports = class JwtService {

    connectWithJwt(req, res, next) {
        // Récupération du token dans le cookie
        let token = new Cookies(req,res).get('access_token');

        // sinon on vérifie le jwt
        jwt.verify(token, process.env.APP_KEY, (err, dataJwt) => { 
            // Erreur du JWT (n'est pas un JWT, a été modifié, est expiré)
            if(!err) req.session.user = dataJwt.user;

            next();          
        });
    }

    connectAuthAdmin(req, res, next) {
        // Récupération du token dans le cookie
        let token = new Cookies(req,res).get('access_token');

        // Si le cookie (access_token) n'existe pas
        if (token == null) return res.sendStatus(401);

        // sinon on vérifie le jwt
        jwt.verify(token, process.env.APP_KEY, (err, dataJwt) => { 
            // Erreur du JWT (n'est pas un JWT, a été modifié, est expiré)
            if(err) return res.sendStatus(403);

            // A partir de là le JWT est valide on a plus qu'à vérifier les droits
            // Si on est admin
            if(typeof dataJwt.roles != 'undefined' && dataJwt.roles.includes('ADMIN')) {
                req.session.user = dataJwt.user;
                next();
            } 
            else {
                req.flash('error', 'Vous n\'avez pas les droits pour accéder à cette page.');
                res.redirect('/');
            }
        });
    }
} 

