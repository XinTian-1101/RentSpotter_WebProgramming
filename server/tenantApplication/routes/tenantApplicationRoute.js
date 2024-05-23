const express = require('express');
const router = express.Router();
const tenantController = require("../controllers/tenantController");

router.get('/', tenantController.getAllProperties);
router.get('/condo', tenantController.getAllCondoProperties);
router.get('/commercial', tenantController.getAllComercialProperties);
router.get('/ViewProperty/:propertyId', tenantController.getOneProperty);
router.get('/tenantViewProperty/:propertyId', tenantController.getOneProperty);
router.get('/tenantApplyForm/:userId', tenantController.getUserProfile);
router.get('/tenantApplyForm/:userId/:propertyId', tenantController.checkApplicationExists);
router.post('/tenantApplyForm', tenantController.createApplication);
router.get('/tenantApplication/:userId', tenantController.getApplications);
router.get('/landlord/:landlordId', tenantController.getLandlord);
router.get('/landlordReview/:landlordId', tenantController.getLandlordReview);
router.get('/property/:propertyId', tenantController.getApplicationsByProperty);
router.get('/leases/tenants', tenantController.getLeasesByTenants);

module.exports = router;