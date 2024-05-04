require('dotenv').config();
const bcrypt = require('bcrypt');   // bcryptjs
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");
const createError = require('../utils/appError');
const nodemailer = require('nodemailer');
const crypto = require('crypto')

//REGISTER LANDLORD ACC
exports.registerLandlordAcc = async(req,res,next) => {
    try {
        const { email, username, phonenumber, role } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return next(new createError("User already exists!", 400));
        }
        const hashedPassword = await bcrypt.hash(req.body.password,12);
        const verificationToken = crypto.randomBytes(16).toString("hex");
        const tokenExpirationDate = new Date(Date.now() + 5 * 60 * 1000); // 5 mins from now
        console.log("Expiry:", tokenExpirationDate);

        const newUser = await User.create({
            email,
            password: hashedPassword,
            username,
            phonenumber,
            role,
            verificationToken,  // Store the verification token directly in the user document
            tokenExpires: tokenExpirationDate, 
            verified: false
        });

        const link = `http://localhost:3000/api/auth/confirmEmail/${verificationToken}`;
        console.log("Verification link: " + link);

        // Send email
        await verifyEmail(newUser.email, link);

        res.status(201).json({
            status:'success',
            message:'User registered successfully',
            verificationToken,
            user:{
                _id:newUser._id,
                username:newUser.username,
                email:newUser.email,
                phonenumber:newUser.phonenumber,
            },
        });

    } catch (error) {
        next(error);
    }
};

//REGISTER TENANT ACC
exports.registerTenantAcc = async(req,res,next) => {
    try {
        const { email, username, phonenumber, role } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return next(new createError("User already exists!", 400));
        }
        const hashedPassword = await bcrypt.hash(req.body.password,12);
        const verificationToken = crypto.randomBytes(16).toString("hex");
        const tokenExpirationDate = new Date(Date.now() + 5 * 60 * 1000); // 5 mins from now
        console.log("Expiry:", tokenExpirationDate);

        const newUser = await User.create({
            email,
            password: hashedPassword,
            username,
            phonenumber,
            role,
            verificationToken, 
            tokenExpires: tokenExpirationDate, 
            verified: false
        });

        const link = `http://localhost:3000/api/auth/confirmEmail/${verificationToken}`;
        console.log("Verification link: " + link);

        // Send email
        await verifyEmail(newUser.email, link);

        res.status(201).json({
            status:'success',
            message:'User registered successfully',
            // token,
            user:{
                _id:newUser._id,
                username:newUser.username,
                email:newUser.email,
                phonenumber:newUser.phonenumber,
            },
        });

    } catch (error) {
        next(error);
    }
};

// LOGIN USER
exports.logIn = async(req,res,next) => {
    try {
        const{email, password} = req.body;
        const user = await User.findOne({email});
        if(!user)
            return next(new createError("User not found",404));

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid)
            return next(new createError("Invalid email or password",401));

        if(user.verified){
            const token = jwt.sign(
                { userId: user._id},    
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            );

            res.status(200).json({
                status: 'success',
                token,
                message: "Logged in successfully",
                user:{
                    _id:user._id,
                    username:user.username,
                    email:user.email,
                    phonenumber:user.phonenumber,
                    role:user.role
                },
            })
        }
        else{   // user havn't verify their account
            // Call the reset verification token function
            await exports.resetVerificationToken(user);
            res.status(400).json({
                status: 'error',
                message: "You must verify your email. A new verification link has been sent."
            });
        };
    } catch (error) {
        next(error);
    }
};

// SEND EMAIL TO VERIFY
async function verifyEmail(email,link){
    console.log("Sending verification email to:", email);
    console.log("Verification link:", link);

    try {
        let transporter = nodemailer.createTransport({
            service:"gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth:{
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            }
        })
    
        //send email
        let info = await transporter.sendMail({
            from:process.env.EMAIL_USERNAME,
            to:email,
            subject:"Account Verification",
            text:"Welcome",
            html: `<h4>Verify Your Email Address</h4>
            <a href="${link}">Click this link to activate your account</a>`
            //mail body
        });
        console.log("Mail send successfully: ", info);
    } catch (error) {
        console.log("Failed to send email:", error);
        throw error;
    }
}

// ACTIVE ACCOUNT
exports.confirmEmail = async (req, res) => {
    try {
        console.log("Accessed confirmEmail with token:", req.params.token);
        
        // Find user by verification token
        const user = await User.findOne({
            verificationToken: req.params.token
        });
        
        if (!user) {
            return res.status(404).send("Verification token is invalid.");
        }

        // Check if the token has expired
        if (user.tokenExpires < new Date()) {
            // Token has expired
            console.log("Token has expired, generating a new one.");

            await resetVerificationToken(user);
            res.status(400).json({
                status: 'error',
                message: "You must verify your email. A new verification link has been sent."
            });

            return res.status(400)({
                error: "Token has expired. A new verification link has been sent to your email."
            });
        }
        
        // If the user is already verified
        if (user.verified) {
            console.log("User already verified.");
            return res.status(400).send("User already verified.");
        }

        // Set user to verified and remove the verification token
        user.verified = true;
        user.verificationToken = null; // Remove token
        user.tokenExpires = null; // Clear the expiration date
        await user.save(); // Save the updated user

        res.send("Email verified successfully!");
    } catch (error) {
        console.error("Error verifying email:", error);
        res.status(500).send("An error occurred during the verification process.");
    }
};

// RESET VERIFICATION TOKEN
exports.resetVerificationToken = async (user) => {
    const newToken = crypto.randomBytes(16).toString("hex");
    const newTokenExpiration = new Date(Date.now() + 5 * 60 * 1000); // 30 seconds from now
    
    user.verificationToken = newToken;
    user.tokenExpires = newTokenExpiration;
    await user.save();

    const link = `http://localhost:3000/api/auth/confirmEmail/${newToken}`;
    await verifyEmail(user.email, link);
};

// FORGOT PASSWORD
exports.forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (!userExists) {
            return next(new createError("User not existed! Please Key In A Correct Email", 400));
        }

        // const tokenEmail = jwt.sign({ id: userExists._id }, process.env.JWT_SECRET, { expiresIn: "5m" });
        const tokenEmail = jwt.sign({ id: userExists._id }, process.env.JWT_SECRET, { expiresIn: "30s" });
        userExists.tokenEmail = tokenEmail;
        await userExists.save();
        
        let transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            }
        });
        console.log("ID:", userExists._id, "Token:", tokenEmail);
        const link = `http://localhost:3000/resetPassword/${userExists._id}/${tokenEmail}`;
        console.log("Reset Password link: " + link);

        // Send email
        await transporter.sendMail({
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: "Reset Password",
            text: "Welcome",
            html: `<p>Click below link to reset your password</p>
            <a href="${link}">${link}</a>`
        });

        console.log("Reset Password Mail sent successfully");
        res.status(200).json({ status: "success", message: "Password reset email sent successfully" });
    } catch (error) {
        console.log("Failed to send email:", error);
        next(error);
    }
};

// RESET PASSWORD
exports.resetPassword = async(req,res) => {
    const {id, token} = req.params
    const {password} = req.body;

    try {
        // Fetch user by id and check if token matches the one stored in DB and is not expired
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send("User not found.");
        }

        console.log("Verifying token:", token);
        // Verifying the token
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        console.log("Current server time: ", new Date());
        console.log("Decoded token data: ", decoded);

        // Proceeding with password update if the token is valid
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.findByIdAndUpdate(id, { password: hashedPassword, tokenEmail: null});

        res.status(200).json({ Status: "Success", message: "Password successfully reset" });

    } catch (err) {
        console.log(err);
        if (err.name === 'TokenExpiredError') {
            res.status(401).json({ Status: "Error", message: "Token expired! Please request a new password reset link again" });
        } else {
            res.status(500).json({ Status: "Error", message: "Failed to reset password" });
        }
    }
}

// GET user profile
exports.getUserProfile = async (req, res, next) => {
    try {
        const {email} = req.body; 
        const user = await User.findOne({email})
        if (!user) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }
        res.status(200).json({
            status: 'success',
            data: user
        });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        next(new createError("Internal Server Error", 500)); // Proper error handling
    }
};



// // POST update user profile
// exports.updateUserProfile = async (req, res, next) => {
//     try {
//         const userId = req.user.id;
//         const { username, phonenumber, email } = req.body;
//         const user = await User.findById(userId);

//         if (!user) {
//             return next(new createError("User not found", 404));
//         }

//         if (user.email !== email) { // Check if the email has been changed
//             user.verified = false; // Require re-verification
//             user.email = email;
//             // Send verification email
//             const verificationToken = crypto.randomBytes(16).toString("hex");
//             user.verificationToken = verificationToken;
//             user.tokenExpires = new Date(Date.now() + 3600000); // 1 hour from now
//             const link = `http://localhost:3000/api/auth/confirmEmail/${verificationToken}`;
//             await verifyEmail(email, link);
//         }

//         user.username = username;
//         user.phonenumber = phonenumber;
//         await user.save();

//         res.status(200).json({
//             status: 'success',
//             message: 'Profile updated successfully',
//             data: {
//                 user
//             }
//         });
//     } catch (error) {
//         next(error);
//     }
// };

// Middleware to authenticate and extract user info
function authenticateToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
    if (!token) return res.sendStatus(401); // No token, unauthorized

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Invalid token
        req.user = user;
        next();
    });
}