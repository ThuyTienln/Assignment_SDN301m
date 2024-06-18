const express = require("express");
const brandRouter = express.Router();

//call controller
const brandController = require("../controller/brandController");

brandRouter
  .route("/")
  .get(brandController.getAll)
  .post(brandController.createBrand);

brandRouter
  .route("/delete/:brandId")
  .get(brandController.deleteBrand);

brandRouter
  .route("/:brandId/detail")
  .get(brandController.getBrandDetail);

module.exports = brandRouter;
 