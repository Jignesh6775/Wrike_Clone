const express = require("express")
const userRouter = express.Router()
const { UserModel } = require("../model/user.model")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secreteKey = 'masai'
const {passport} = require('../Google.OAuth')

//registration
userRouter.post("/register", async (req, res) => {
    const { username, email ,mobile, password } = req.body
    try {
        const isUserPresent = await UserModel.findOne({ email })
        if (isUserPresent) {
            return res.status(404).send({ msg: "Login Directly , Already Registered" })
        }
        bcrypt.hash(password, 4, async (err, hash) => {
            const user = new UserModel({ username, mobile, email, password: hash })
            await user.save()
            res.status(201).send({ "msg": "Registration successful" })
        })
    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }
})


//login
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.findOne({ email })
        // console.log(user)
        if (user) {
            const isPasswordMatch = await bcrypt.compare(password, user.password);

            if (isPasswordMatch) {
                const token = jwt.sign({ userID: user._id }, secreteKey, { expiresIn: '7d' });
                res.status(201).send({ msg: "Login successful", token, userdetails: user });
            } else {
                res.status(401).send({ msg: "Wrong credentials" });
            }
        } else {
            res.status(401).send({ msg: "Login failed, user is not present" });
        }

    } catch (err) {
        res.status(400).send({ msg: err.message })
    }
})

userRouter.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

userRouter.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login",
        session: false,
    }),
    async function (req, res) {
        try {
            const fetch_user = await UserModel.findOne({ email: req.user.email });
          
          
            if (fetch_user) {
                token_Generator(res, fetch_user.name, fetch_user._id , fetch_user.image);
            } else {
                bcrypt.hash("password", 2, async (err, hash) => {
                    const newUser = new UserModel({
                        name: req.user.name,
                        email: req.user.email,
                        password: hash,
                        image : req.user.avtar
                    });
                    await newUser.save();
                   
                    token_Generator(res, req.user.name, "login with google",req.user.avtar);
                });
            }
        } catch (error) {
            res.status(500).send({ msg: "An error occurred while authenticating with Google" });
        }
    }
);

//---------------- Functions Here -----------------------------------

function token_Generator(res, name, id,image) {
    let token = jwt.sign(
        { user: name, userID: id ,role : "User" },
        "privateKey",
        { expiresIn: "7d" }
    );
    let refreshToken = jwt.sign(
        { user: name, id: id },
        "privateKey",
        { expiresIn: "12d" }
    );
    
    const redirectUrl = `https://profound-basbousa-ffaf25.netlify.app/dashboard.html?token=${token}&username=${name}&image=${image}`;

    res.redirect(redirectUrl);
}


// userRouter.get("/details", (req, res) => {
//     const token = req.headers.authorization
//     jwt.verify(token, secreteKey, (err, decoded) => {
//         decoded ? res.status(200).send("User details") : res.status(400).send({ "msg": "Login required, cannot access the restricted routes" })
//     })
// })


module.exports = {
    userRouter
}