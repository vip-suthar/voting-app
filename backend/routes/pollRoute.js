const express = require('express');
const mongoose = require('mongoose');
const PollSchema = require('../models/pollModel.js');
const UserSchema = require('../models/userModel.js');

const router = express.Router();

// Get a Poll
router.get("/:id", async function (req, res){
    try {
        let poll_id = mongoose.Types.ObjectId(req.params.id);
        let poll = await PollSchema.findById(poll_id);
        res.send(poll);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Create a poll
router.post("/", async function (req, res){
    try {
        console.log("hello", req.body);
        let poll = new PollSchema(req.body);
        await poll.save();
        // let user = await UserSchema.findById(req.body.admin);
        // user.polls.push(poll._id);
        await UserSchema.findOneAndUpdate({ _id: req.body.admin }, { $push: { polls: poll._id }});
        res.send(poll);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Upadting a poll
router.patch("/:id", async function (req, res){
    try {
        let poll_id = req.params.id;
        await PollSchema.findOneAndUpdate({ _id: poll_id }, { title: req.body.title, description: req.body.description, choices: req.body.choices });
        let poll = await PollSchema.findById(poll_id);
        res.send(poll);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete a poll
router.delete("/:id", async function (req, res){
    try {
        let poll_id = req.params.id;
        let poll = await PollSchema.findById(poll_id);
        await PollSchema.findOneAndDelete({_id: poll_id});
        let user = await UserSchema.findById(poll.admin);
        user.polls.push(poll._id);
        await UserSchema.findOneAndUpdate({ _id: req.body.admin }, { polls: user.polls});
        res.send({});
    } catch (error) {
        res.status(500).send(error);
    }
});




module.exports = router;