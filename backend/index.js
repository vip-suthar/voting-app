const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./config');

const PollRoute = require('./routes/pollRoute.js');
const UserRoute = require('./routes/userRoute.js');
const CastVoteRoute = require('./routes/castVoteRoute.js');
// const cors = require('cors');

const app = express();

app.use(express.json());

// database
const mongodbUrl = config.MONGODB_URL;

mongoose
    .connect(mongodbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .catch((error) => console.log(error.reason));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// console.log("h1");
db.once('open', function callback() {
    console.log("Database ready to be connected");
});

// app.use(cors());

// poll CRUD
app.use("/api/poll", PollRoute);

// user CRUD
app.use("/api/user", UserRoute);

// cast a vote
app.use("/api/cast-vote", CastVoteRoute);

app.use(express.static(path.join(__dirname, `/../frontend/build`)));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../frontend/build/index.html'));
});


app.listen(config.PORT, () => {
    console.log(`Server started at http://localhost:${config.PORT}`);
});
