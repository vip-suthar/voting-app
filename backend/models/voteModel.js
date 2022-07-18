const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, default: null, unique: true },
    pollId: { type: mongoose.Schema.Types.ObjectId, required: true },
    choiceId: { type: Number, required: true }
});

var Vote = mongoose.model('Vote', VoteSchema);

module.exports = Vote;