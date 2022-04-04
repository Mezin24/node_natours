const express = require('express')
const userControllers = require('./../controllers/userControllers')

const userRouter = express.Router()

userRouter
  .route('/')
  .get(userControllers.getAllUsers)
  .post(userControllers.addNewUser)
userRouter
  .route('/:id')
  .get(userControllers.getUser)
  .patch(userControllers.updateUser)
  .delete(userControllers.deleteUser)

module.exports = userRouter
