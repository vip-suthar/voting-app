const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, default: "User" },
    email: { type: String, required: true, unique: true, index: true, dropDups: true },
    password: { type: String, required: true },
    votes: {
        type: [{
            pollId: { type: mongoose.Schema.Types.ObjectId, required: true },
            choiceId: { type: Number, required: true }
        }],
        default: []
    },
    polls: { type: [{ type: mongoose.Schema.Types.ObjectId }], default: [] }
});

var User = mongoose.model('User', UserSchema);

module.exports = User;