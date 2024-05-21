const Lease = require('../models/leaseModel');
const User = require('../models/userModel');

exports.getLeasesByPropertyId = async (req, res) => {
    try {
        const { propertyId } = req.params;
        if (!propertyId) {
            return res.status(400).json({ message: "Property ID is required" });
        }
        const leases = await Lease.find({ propertyId }).populate('tenantId','username');
        res.json(leases);
    } catch (err) {
        console.error("Error fetching leases:", err); 
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.getLeasesByTenantUsername = async (req, res) => {
    try {
        const { username } = req.params;
        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }
        const tenant = await User.findOne({ username });
        if (!tenant) {
            return res.status(404).json({ message: "Tenant not found" });
        }
        const leases = await Lease.find({ tenantId: tenant._id }).populate('tenantId', 'username');
        res.json(leases);
    } catch (err) {
        console.error("Error fetching leases:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};