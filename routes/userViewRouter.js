const express = require("express");
const userRouter = express.Router();
const { ensureAuthenticated, ensureAdmin } = require("../config/auth");

//call controller
const userController = require("../controller/userController");

userRouter
  .route("/")
  .get(userController.login)
  .post(userController.signin);

userRouter
  .route("/register")
  .get(userController.register)
  .post(userController.registerPost);

userRouter.route("/logout")
  .get(userController.signout);
  
userRouter
  .route("/dashboard")
  .get(ensureAuthenticated, userController.dashboard);
  // .get(ensureAdmin, userController.dashboard);

userRouter
  .route("/dashboard/:userId")
  .get(userController.formEditUser)
  .post(userController.editUser)
  // .get(userController.getUserDetail)

userRouter.route("/dashboard/delete/:userId")
 .get(userController.deleteUser)

module.exports = userRouter;
