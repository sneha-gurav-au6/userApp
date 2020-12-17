const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

//user model
const user = new Schema({
    //user from input register form

    email: {
        type: String,
    },
    password: {
        type: String,
    },

    name: {
        type: String,
    },

    hobbies: {
        type: Array,
    },
    college: {
        type: String,
    },
    birth_date: {
        type: String,
    },
    gender: {
        type: String,
    },
    address: {
        type: String,
    },
});

//user login static method
user.statics.userFind = function (email, password) {
    var userObj = null;
    return new Promise(function (resolve, reject) {
        //find user by email and compare current password with original password by using bcrypt compare method
        User.findOne({
            email: email,
        })
            .then(function (user) {
                console.log(user);
                if (!user) {
                    return reject("Incorrect Credintials");
                }
                userObj = user;
                //comparing current password with original
                return bcrypt.compare(password, user.password);
            })
            .then(function (isMatched) {
                if (!isMatched) return reject("Incorrect credentials as");
                console.log(isMatched);
                resolve(userObj);
            })
            .catch(function (err) {
                reject(err);
            });
    });
};
module.exports = User = mongoose.model("users", user);
