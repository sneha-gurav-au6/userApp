//mongodb connection

const mongoose = require("mongoose");

mongoose
    .connect(
        `mongodb+srv://sneha:sneha@bowser.lkpry.mongodb.net/userdetail?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        }
    )
    .then(function () {
        console.log("Mongo db compass connected");
    })
    .catch(function (err) {
        console.log(err.message);
    });
