const Brands = require('../models/brand');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

class brandController {
    getAll(req, res, next) {
        Brands.find({})
            .then((brands) => {
                res.render('brands', {
                    title: 'List of brands',
                    brandData: brands,
                })
            })
    }
      createBrand(req, res) {
        if (req.body.id) {
          Brands.findByIdAndUpdate(
            req.body.id,
            { $set: req.body },
            { new: true }
          ).then(() => {
            res.redirect("/brands");
          });
        } else {
          const br = new Brands(req.body);
          br.save().then(() => {
            res.redirect("/brands");
          });
        }
      }
      deleteBrand(req, res) {
        Brands.findByIdAndDelete(req.params.brandId)
        .then(() => {
          res.redirect("/brands");
        });
      }
      getBrandDetail(req, res) {
        Brands.findById(req.params.brandId).then((brand) => {
          res.status(200).json(brand);
        });
      }

}
module.exports = new brandController();