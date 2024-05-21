const { response } = require('express');
const Application = require('../../models/applicationModel');
const Property = require('../../models/propertyModel');
const User = require('../../models/userModel');
const createError = require('../../utils/appError');

//GET All Properties
const getAllProperties = async (req, res) => {
  try {
    const response = await Property.find().sort({ createdAt: -1 });
    console.log("Property List:", response);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//GET All Condo Properties
const getAllCondoProperties = async (req, res) => {
  try {
    const response = await Property.find({ type: 'Condo' }).sort({ createdAt: -1 });
    console.log("Condo List:", response);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//GET All Commercial Properties
const getAllComercialProperties = async (req, res) => {
  try {
    const response = await Property.find({ type: 'Commercial' }).sort({ createdAt: -1 });
    console.log("Commercial List:", response);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//GET One Property by propertyId
const getOneProperty = async (req, res) => {
  const { propertyId } = req.params;

  console.log("Property Id: " + propertyId);

  try {
    const response = await Property.findById(propertyId);

    if (!response)
      return res.status(404).json({ error: "The post is not found" });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//GET user by userId
const getUserProfile = async (req, res) => {
  try {
      const userId = req.params.userId;
      console.log("User id: " + userId)
      const user = await User.findById(userId);
      res.json(user);
  } catch (err) {
      console.error("Error fetching user profile by user ID:", err);
      res.status(500).json({ message: "Internal Server Error" });
  }
};

//POST New Application Record
const createApplication  = async (req, res) => {
  const {userId, propertyId} = req.body;

  try {
    // Validate that the user and property exist
    const user = await User.findById(userId);
    const property = await Property.findById(propertyId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    // Create a new application
    const newApplication = new Application({
      tenantId: userId,
      propertyId: propertyId,
      applicationStatus: 'Pending', // Default status
    });

    // Save the application to the database
    const savedApplication = await newApplication.save();

    console.log("New application created:", savedApplication);
    return res.status(201).json(savedApplication);
  } catch (error) {
    console.error("Error creating application:", error);
    return res.status(500).json({ error: error.message });
  }
};

//GET Application to check for existing application
const checkApplicationExists = async (req, res) => {
  const { userId, propertyId } = req.params;

  try {
    const existingApplication = await Application.findOne({ tenantId: userId, propertyId: propertyId });

    if (existingApplication) {
      console.log("Property Exist");
      return res.status(200).json({ exists: true });
    } else {
      console.log("Property Not Exist");
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking application existence:", error);
    return res.status(500).json({ error: error.message });
  }
};

//GET Applications by userId
const getApplications = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("User id: " + userId);

    const response = await Application.find({ tenantId: userId }).sort({ createdAt: -1 });
    console.log("Application List: ", response);

    return res.status(200).json(response);
  } catch (err) {
    console.error("Error fetching user profile by user ID:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllProperties,
  getAllCondoProperties,
  getAllComercialProperties,
  getOneProperty,
  getUserProfile,
  checkApplicationExists,
  createApplication,
  getApplications
};

/*
// GET property list
exports.getAllProperties = async (req, res, next) => {
    console.log(req.body)
    try {
        console.log(req.body)
        // Query to retrieve all properties
        const properties = await Property.find();

        console.log(properties.length)
        
        // Send the list of properties in the response
        res.status(200).json({
            status: 'success',
            data: properties
        });
    } catch (error) {
        console.error("Error fetching property list:", error);
        next(new createError("Internal Server Error", 404));
    }
};

// GET property list
exports.getPropertyDetails = async (req, res, next) => {
    console.log(req)
    try {
        const{propertyId} = req.body;
        const property = await Property.findOne({propertyId});
        if(!property)
            return next(new createError("Property not found",404));

        console.log(property)
        
        // Send the list of properties in the response
        res.status(200).json({
            status: 'success',
            data: properties
        });
    } catch (error) {
        console.error("Error fetching property:", error);
        next(new createError("Internal Server Error", 404));
    }
};*/
