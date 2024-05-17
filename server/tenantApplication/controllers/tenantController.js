const Application = require("../models/applicationModel");
const Property = require("../models/propertyModel");

// GET property list
exports.getAllProperties = async (req, res, next) => {
    try {
        // Query to retrieve all properties
        const properties = await Property.find();
        
        // Send the list of properties in the response
        res.status(200).json({
            status: 'success',
            data: properties
        });
    } catch (error) {
        // Handle errors
        next(error);
    }
};
