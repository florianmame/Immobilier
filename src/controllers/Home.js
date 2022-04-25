const RepoRealty = require('../repository/Realty');
const UploadImageProduct = require('../services/UploadImageProduct')
module.exports = class Home {
    print(req, res) {
        let repo = new RepoRealty();
        repo.find().then((realties) => {
            realties = realties.map((realty) => {
                const images = new UploadImageProduct();
                realty.pictures = images.getPictures(realty._id);
                return realty;
            });
            res.render('home', {realties});
        });
    }

    printRealty(req, res) {
        if(typeof req.params.id != 'undefined'  && req.params.id != '') {
            let repo = new RepoRealty();
            repo.find({_id : req.params.id}).then((realty) => {
                const images = new UploadImageProduct();
                realty[0].pictures = images.getPictures(realty[0]._id);
                res.render('realty', { realty : realty[0] });
            },() => {
                req.flash('error', 'Une erreur est survenue.');
                res.redirect('/');
            });
        }
    }
};