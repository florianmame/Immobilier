const RepoRealty = require('../repository/Realty');
module.exports = class Home {
    print(req, res) {
        let repo = new RepoRealty();
        repo.find().then((realties) => {
            res.render('home', {realties});
        });
    }

    printRealty(req, res) {
        if(typeof req.params.id != 'undefined'  && req.params.id != '') {
            let repo = new RepoRealty();
            repo.find({_id : req.params.id}).then((realty) => {
                res.render('realty', { realty : realty[0] });
            },() => {
                req.flash('error', 'Une erreur est survenue.');
                res.redirect('/');
            });
        }
    }
};