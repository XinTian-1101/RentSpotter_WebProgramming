const express = require("express");
const router = express.Router();
const authenticate = require("../middlwares/userIdMiddleware");
const tenantController = require("../controllers/tenantController");

<<<<<<< HEAD
router.get("/", tenantController.getAllProperties);
router.get("/condo", tenantController.getAllCondoProperties);
router.get("/commercial", tenantController.getAllComercialProperties);
router.get("/ViewProperty/:propertyId", tenantController.getOneProperty);
router.get("/tenantViewProperty/:propertyId", tenantController.getOneProperty);
router.get("/tenantApplyForm/:userId", tenantController.getUserProfile);
router.get(
  "/tenantApplyForm/:userId/:propertyId",
  tenantController.checkApplicationExists
);
router.post("/tenantApplyForm", tenantController.createApplication);
router.get("/tenantApplication/:userId", tenantController.getApplications);
router.get("/landlord/:landlordId", tenantController.getLandlord);
router.get("/landlordReview/:landlordId", tenantController.getLandlordReview);
router.get(
  "/tenantToLease/:applicationId",
  tenantController.getLeaseByApplicationId
);
=======
router.get('/', tenantController.getAllProperties);
router.get('/ViewProperty/:propertyId', tenantController.getOneProperty);
router.get('/tenantViewProperty/:propertyId', tenantController.getOneProperty);
>>>>>>> 314ff59 (jwt installed)

module.exports = router;
