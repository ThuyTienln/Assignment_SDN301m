const Watches = require('../models/watch');
const Brands = require('../models/brand');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

class watchController {
    getAll(req, res, next) {
        Watches.find({})
            .populate("brand")
            .then((watch) => {
                res.render('homePage', {
                    title: 'List of watches',
                    watchData: watch,               
                })                          
            })
    }

    createWatchGet(req, res, next) {
        // res.render('createWatch', {});
        Brands.find({})
            .then((brands) => {
                res.render('createWatch', {
                    title: 'List of watches',
                    brandData: brands
                })
            })
    }

    createWatchPost(req, res, next) {
        const { watchName, image, price, watchDescription, brand } = req.body;
        let errors = [];
        if (errors.length > 0) {

        } else {
            Watches.findOne({ watchName: watchName }).then((watch) => {
                if (watch) {
                    errors.push({ msg: "Watch name already exists" });
                    res.render("createWatch", {
                        errors,
                        watchName,
                        image,
                        price,
                        watchDescription,
                        brand,
                    });
                } else {
                    const newWatch = new Watches({
                        watchName,
                        image,
                        price,
                        watchDescription,
                        brand,
                    });
                    newWatch
                        .save()
                        .then((watch) => {
                            res.redirect("/watches");
                        })
                        .catch(next);
                }
            });
        }
    }

    deleteWatch(req, res) {
        Watches.findByIdAndDelete(req.params.watchId)
            .then(() => res.redirect('/watches'))
    }

    formEdit(req, res) {
        let viewsData = {};
        Watches.findById(req.params.watchId)
        .populate("brand")
            .then((watch) => {
                Brands.find({})
                .then((brand) => {
                    res.render('editWatch', {
                        title: 'Edit Page',
                        watchData: watch,
                        brandData: brand
                })              
                })
            })
    }

    edit(req, res) {
        Watches.updateOne({ _id: req.params.watchId }, req.body)
            .then(() => {
                res.redirect('/watches');
            })
    }

    getDetailWatch(req, res, next) {
        let viewData = {};
        Watches.findById(req.params.watchId)
            .populate("brand")
            .then((watch) => {
                res.render('watches', {
                    title: 'Detail of watch',
                    watchData: watch              
                })                          
            })
    }

}
module.exports = new watchController();