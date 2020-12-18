const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

const dotenv = require("dotenv");
dotenv.config();

//database connection to application
require("./db");
app.use(express.json());

const passport = require("passport");
//configure passport
require("./config/passport")(passport);
app.use(passport.initialize());

//user-route
const userRoute = require("./routes/userRoute");
app.use(userRoute);

//code for depolying on heroku
// app.use(express.static("client/build"));

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "build", "index.html"));
// });

//to run on local server
app.get("/", (req, res) => {
    res.send("hello");
});

app.listen(PORT, () => {
    console.log("server started");
});
