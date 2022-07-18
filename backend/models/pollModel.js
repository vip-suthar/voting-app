const mongoose = require('mongoose');

const PollSchema = new mongoose.Schema({
    title: { type: String, default: "New Poll" },
    description: { type: String, default: "Yay! you got this poll up and running" },
    choices: {
        type: [{
            _id: { type: Number, required: true, unique: true },
            title: { type: String, required: true },
            description: { type: String }
        }],
        required: true
    },
    admin: { type: mongoose.Schema.Types.ObjectId, required: true },
    votes: {
        type: [{
            userId: { type: mongoose.Schema.Types.ObjectId, default: null, unique: true },
            choiceId: { type: Number, required: true }
        }],
        required: true
    }
});

var Poll = mongoose.model('Poll', PollSchema);

module.exports = Poll;