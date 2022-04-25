const RepoUser = require('../repository/User');
module.exports = class User {
    
    print(request, response) {
        if(typeof request.session.user !== 'undefined') {
            let repo = new RepoUser();
            repo.find().then((users) => {
                response.render('admin/user/list', {users});
            });
        } else {
            request.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
            response.redirect('/connexion');  
        }
    }

    printForm(request, response) {
        if(typeof request.session === 'undefined' || typeof request.session.user === 'undefined') {
            request.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
            response.redirect('/connexion');  
            return;
        }
        // on est en modification
        if(typeof request.params.id !== 'undefined') {
            let repo = new RepoUser();
            repo.findById(request.params.id).then((user) => {
                response.render('admin/user/form', {form : user});
            }, () => {
                request.flash('error',`L'utilisateur n'a pas été trouvé`)
                response.redirect('/admin/user');
            });   
        } 
        // on est en ajout
        else {
            response.render('admin/user/form', {form: { contact: {}, address : {}}});
        }
    }

    processForm(request, response) {  
        if(typeof request.session.user === 'undefined') {
            request.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
            response.redirect('/connexion');  
        }
        const entity = request.body.user || {};
        const repo = new RepoUser();
        let save;
        if(typeof request.params.id != 'undefined'  && request.params.id != '') {
            save = repo.edit(request.params.id, entity);
        }
        else {
            save = repo.add(entity);
        }
        
        save.then((user) => {
            //Affichage quand on est en modification
            if(typeof request.params.id != 'undefined'  && request.params.id != '') {
                request.flash('notify', "L'utilisateur a été modifié.");
                //Affichage quand on est en ajout
            } else {
                request.flash('notify', "L'utilisateur a été créé.");
            }
            response.redirect('/admin/User')
        }, (err) => {
            response.render('admin/user/form', { 
                error : `L'enregistrement en base de données a échoué`, 
                form : entity 
            }); 
        });

    }
    delete(request, response) {
        if(typeof request.session === 'undefined' || typeof request.session.user === 'undefined') {
            request.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
            response.redirect('/connexion');  
            return;
        }
 
        if(typeof request.params.id != 'undefined' && request.params.id != '') {
            let repo = new RepoUser();
            repo.delete({_id : request.params.id}).then(() => {
                request.flash('notify', "L'utilisateur a été supprimé.");
                response.redirect('/admin/user');
            }, () => {
                request.flash('error', "La suppression de l'utilisateur a échoué.");
                response.redirect('/admin/user');
            });  
        } 
        else {
            request.flash('error', 'Une erreur est survenue.');
            response.redirect('/admin/user');
        }
    }

}
            

