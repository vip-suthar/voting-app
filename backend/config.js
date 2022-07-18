const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 8000,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost:27017/voting_app', // mongodb+srv://vip_voting_app:yUQO0kcDHFQd5hW9@cluster0.gswzb.mongodb.net/voting_app?retryWrites=true&w=majority
};