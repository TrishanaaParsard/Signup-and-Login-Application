const express = require('express');
const router = express.Router();

//mongodb user model
const User = require('./../models/User');

//mongodb user verification model
const UserVerification = require('./../models/UserVerification');

//email handler
const nodemailer =  require('nodemailer');

//unique string
const {v4: uuidv4} = require('uuid');

// env variables
require('dotenv').config();

// Password handler
const bcrypt = require('bcrypt');

// path for static verified page
const path = require("path");

// nodemailer 
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS
    }
})

// testing success
transporter.verify((error, sucess) => {
    if(error){
        console.log(error);
    } else {
        console.log("Ready for messages")
        console.log(sucess);
    }
})

//signup
router.post('/signup', (req,res)=>{
    let {email,password} = req.body;
    email = email.trim();
    password = password.trim();

    if(email =="" || password == ""){
        res.json({
            status: "FAILED",
            message: "Empty input fields!"
        });
    } else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
        res.json({
            status: "FAILED",
            message: "Invalid email entered!"
        });
    } else if(password.length < 8){
        res.json({
            status: "FAILED",
            message: "Password is too short!"
        });
    } else{
        // Checking if user already exists
        User.find({email}).then(result => {
            if(result.length){
                // A user already exists
                res.json({
                    status: "FAILED",
                    message: "User with the provided email already exists!"
                })
            } else{
                // Create new user

                //password handling
                const saltRounds = 10;
                bcrypt.hash(password,saltRounds).then(hashedPassword =>{
                    const newUser = new User({
                        email,
                        password: hashedPassword,
                        verified: false,
                    });

                    newUser.save().then(result =>{
                       // handles account verification
                       sendVerificationEmail(result, res);
                    })
                    .catch(err =>{
                        res.json({
                            status: "FAILED",
                            message: "An error occurred while saving user account!"
                        })
                    })
                })
                .catch(err =>{
                    res.json({
                         status: "FAILED",
                         message: "An error occurred while hashing password!"
                    })
                })
            }
        }).catch(err => {
            console.log(err);
             res.json({
                status: "FAILED",
                message: "An error occurred while checking for existing user!"
            })
        })

    }
})

// send verification email
const sendVerificationEmail = ({_id, email}, res) => {
    // url to be used in the email
    const currentUrl = "http://localhost:5000/";

    const uniqueString = uuidv4() + _id;

    // mail options
    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Verify your Email",
        html: `<p>Verify your email address to complete the signup and login into your account.</p><p>This link <b>expries in 6 hours</b>.</p>
        <p> Press <a href=${currentUrl + "user/verify/" + _id + "/" + uniqueString}> here</a> to proceed.</p>`
    };

    // hash the uniqueString
    const saltRounds = 10;
    bcrypt
    .hash(uniqueString, saltRounds)
    .then((hashUniqueString) => {
        // set values in userVerification collection
        const newVerification = new UserVerification({
            userId: _id,
            uniqueString: hashUniqueString,
            createdAt: Date.now(),
            expiresAt: Date.now() + 21600000,
        });

        newVerification
        .save()
        .then(()=> {
            transporter
            .sendMail(mailOptions)
            .then(() => {
                // email sent and verification record saved
                res.json({
                    status: "PENDING",
                    message: "Verification email sent!",
                });
            })
            .catch((error) => {
                console.log(error);
                res.json({
                    status: "FAILED",
                    message: "Verification email failed!",
                });
            })
        })
        .catch((error) => {
            console.log(error);
            res.json({
                status: "FAILED",
                message: "Could not save verification email data!",
            });
        })
    })
    .catch(() => {
        res.json({
            status: "FAILED",
            message: "An error occurred while hashing email data!",
        });
    })
};

// verify email
router.get("/verify/:userId/:uniqueString", (req, res) => {
    let {userId, uniqueString} = req.params;

    UserVerification
    .find({userId})
    .then((result) => {
        if(result.length > 0 ){
            // user verification record exists, further proceed

            const {expiresAt} = result[0];
            const hashedUniqueString = result[0].uniqueString;

            // Checking for expired unique string
            if(expiresAt < Date.now()){
                // record has expired so we delete it
                UserVerification
                .deleteOne({userId})
                .then( result => {
                    User
                    .deleteOne({_id: userId})
                    .then(() => {
                        let message = "Link has expired. Please sign up again.";
                        res.redirect(`/user/verified/error=true&message=${message}`);
                    })
                    .catch((error) => {
                        console.log(error);
                        let message = "Clearing user with expired unqiue string failed.";
                        res.redirect(`/user/verified/error=true&message=${message}`);
                    })
                })
                .catch((error) => {
                    console.log(error);
                    let message = "An error occurred while clearing expired user verification record.";
                    res.redirect(`/user/verified/error=true&message=${message}`);
                })
            } else {
                // valid record ecists so we validate the user string
                // First compare the hashed unqiue string
                bcrypt
                .compare(uniqueString, hashedUniqueString)
                .then( result =>{
                    if (result){
                        // string match
                        User
                        .updateOne({_id: userId}, {verified: true})
                        .then(() => {
                            UserVerification
                            .deleteOne({userId})
                            .then(() =>{
                                res.sendFile(path.join(__dirname, "./../views/verified.html"));
                            })
                            .catch( error => {
                                console.log(error);
                                let message = "An error occurred while finalizing successful verification.";
                                res.redirect(`/user/verified/error=true&message=${message}`);
                            })
                        })
                        .catch( error => {
                            console.log(error);
                            let message = "An error occurred while updating user record to show verified.";
                            res.redirect(`/user/verified/error=true&message=${message}`);
                        })

                    } else {
                        // existing but incorrect verification details given
                        let message = "Invalid verification details given. Check you inbox.";
                        res.redirect(`/user/verified/error=true&message=${message}`);
                    }
                })
                .catch(error => {
                    let message = "An error occurred while comparing unqique strings.";
                    res.redirect(`/user/verified/error=true&message=${message}`);
                })
            }

        } else {
            // user verification record does not exist
            let message = "Account record doesn 't exist or have been verified already. Please sign up or log in.";
            res.redirect(`/user/verified/error=true&message=${message}`);
        }
    })
    .catch((error) => {
        console.log(error);
        let message = "An error occurred while checking for existing user verification record";
        res.redirect(`/user/verified/error=true&message=${message}`);
    })
});

// verified page route
router.get("/verified", (req, res) => {
    res.sendFile(path.join(__dirname, "./../views/verified.html"));
})

//Login
router.post('/login', (req, res)=>{
    let {email,password} = req.body;
    email = email.trim();
    password = password.trim();

    if(email =="" || password == ""){
        res.json({
            status: "FAILED",
            message: "Empty credentials given!"
        });
    } else {
        // Check if user exists.
        User.find({email})
        .then(data => {
            if(data.length){
                // User exists

                // Checks if user is verified

                if (!data[0].verified) {
                    res.json({
                        status: "FAILED",
                        message: "Email hasn't been verified yet. Check your inbox."
                    });
                } else {
                    const hashedPassword = data[0].password;
                    bcrypt.compare(password, hashedPassword).then(result => {
                        if(result){
                            //Password Match
                            res.json({
                                status: "SUCESS",
                                message: "Signin successful",
                                data: result,
                            });
                        } else {
                            res.json({
                                status: "FAILED",
                                message: "Invalid password entered!"
                            });
                        }
                    })
                    .catch(err => {
                        res.json({
                            status: "FAILED",
                            message: "An error occurred while comparing passwords!",
                        });
                    });
                }  
            } else {
                res.json({
                    status: "FAILED",
                    message: "Invalid credentials entered!"
                });
            }
        })
        .catch(err => {
            res.json({
                status: "FAILED",
                message: "An error occurred while checking for existing user account!"
            });
        })
    }

})

module.exports = router;