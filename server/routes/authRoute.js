const express = require('express');
const authController = require("../controllers/authController");

const router = express.Router();

router.post('/registerLandlordAcc', authController.registerLandlordAcc);
router.post('/registerTenantAcc', authController.registerTenantAcc);
router.post('/logIn', authController.logIn);
router.post('/forgotPassword', authController.forgotPassword);
router.post('/resetPassword/:id/:token', authController.resetPassword);
router.get('/confirmEmail/:token', authController.confirmEmail);
router.get('/landlordProfileEdit', authController.getUserProfile);
router.put('/landlordProfileEdit', authController.updateUserProfile);

module.exports = router;