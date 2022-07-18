const express = require('express');
const PollSchema = require('../models/pollModel.js');
const UserSchema = require('../models/userModel.js');

const router = express.Router();

// Casting a vote to a poll
router.post("/", async function (req, res) {
    try {
        let poll_id = req.body.pollId;
        let poll = await PollSchema.findById(poll_id);
        poll.votes.push({
            userId: req.body.userId,
            choiceId: req.body.choiceId
        });
        await PollSchema.findByIdAndUpdate(poll_id, {votes: poll.votes});

        if (req.body.userId && req.body.userId != null) {
            let user = await UserSchema.findById(req.body.userId);
            // console.length
            user.votes.push({
                pollId: poll_id,
                choiceId: req.body.choiceId
            });
            await UserSchema.findByIdAndUpdate(req.body.userId, { votes: user.votes});
        }
        
        res.send({
            userId: req.body.userId,
            pollId: poll_id,
            choiceId: req.body.choiceId
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
