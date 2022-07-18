// const PollSchema = require('../models/pollModel.js');
const express = require('express');
const UserSchema = require('../models/userModel.js');

const router = express.Router();

// sign in a user
router.get("/:id", async function (req, res) {
    try {
        let response = {};
        let user = await UserSchema.findById(req.params.id);
        if (user && user.password) {
            response = {
                _id: user._id,
                name: user.name,
                email: user.email,
                polls: user.polls,
                votes: user.votes
            };
        } else {
            response = {
                success: false,
                message: "user does not exist"
            }
        }

        res.send(response);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.post("/sign-in", async function (req, res) {
    try {
        let email = req.body.email;
        let [user] = await UserSchema.find({ email: email });
        let response = {};
        if (user && user.password == req.body.password) {
            response = {
                _id: user._id,
                name: user.name,
                email: user.email,
                polls: user.polls,
                votes: user.votes
            };
        } else {
            response = {
                success: false,
                message: "invalid email or password"
            }
        }
        res.send(response);
    } catch (error) {
        res.status(500).send(error);
    }
})

// Create a user
router.post("/sign-up", async function (req, res) {
    try {
        let response = {};
        let [user] = await UserSchema.find({ email: req.body.email });
        if (user) {
            response = {
                success: false,
                message: "user already exists"
            }
        }
        else {
            user = new UserSchema(req.body);
            await user.save();
            response = {
                _id: user._id,
                name: user.name,
                email: user.email,
                polls: user.polls,
                votes: user.votes
            };

        }
        res.send(response);
    } catch (error) {
        res.status(500).send(error);
    }
});


// Update a user
router.patch("/:id", async function (req, res) {
    try {
        let user_id = req.params.id;
        await UserSchema.findOneAndUpdate({ _id: user_id }, { name: req.body.name, password: req.body.password, votes: req.body.votes });
        let user = await UserSchema.findById(user_id);
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            polls: user.polls,
            votes: user.votes
        })
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete a user
router.delete("/:id", async function (req, res) {
    try {
        let user_id = req.params.id;
        await UserSchema.findOneAndDelete({ _id: user_id });
        res.send({});
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;