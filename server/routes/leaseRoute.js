const express = require('express');
const router = express.Router();
const leasesController = require('../controllers/leaseController');

router.get('/:propertyId', leasesController.getLeasesByPropertyId);
router.get('/tenant/:username', leasesController.getLeasesByTenantUsername);
router.get('/leasesAndProperties/tenant/:tenantId', leasesController.getLeasesAndPropertiesByTenantId);

module.exports = router;
