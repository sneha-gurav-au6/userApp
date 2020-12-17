const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../model/user");
const validateRegisterData = require("../../config/validation/registerValidator");

module.exports = {
    registerUser: async (req, res) => {
        console.log(req.body);
        const { errors, isValid } = validateRegisterData(req.body);

        //checking for validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        //checking if user already existed or not
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res
                .status(400)
                .json({ message: "Email Already Exists, Please Login" });
        } else {
            const newUser = new User({
                name: req.body.name,

                email: req.body.email,
                password: req.body.password,
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then((user) =>
                            res.json({
                                message:
                                    "Registered successfully. You can log in now",
                                user: user,
                                status: 201,
                            })
                        )
                        .catch((err) => console.log(err));
                });
            });
        }
    },
    loginUser: async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;

        //checking for email and password match
        User.userFind(email, password)
            .then((user) => {
                if (!user) {
                    return res
                        .status(404)
                        .json({ message: "Invalid Creadintials in login" });
                }
                const payload = {
                    id: user.id,

                    name: user.name,
                    email: user.email,
                };
                jwt.sign(
                    payload,
                    "secret key",
                    { expiresIn: 60 * 60 * 30 },
                    (err, token) => {
                        res.json({
                            message: "Logged in Successfully",
                            token: token,
                        });
                    }
                );
            })

            //if email or password not matches throw error
            .catch((err) => {
                res.status(401).json({
                    message: "Incorrect Credentials in login",
                });
            });
    },
    //getting task
    getAlluser: (req, res) => {
        //finding document by its id

        User.find()
            .sort({ _id: -1 })
            .then((particularUser) => {
                console.log(particularUser);
                // res.status(200).json({
                //     message: "Meeting Detail",
                //     data: particularMeeting,
                // });
                res.status(200).send(particularUser);
            })
            .catch((err) => {
                res.send(err);
            });
    },
    EditProfile: (req, res) => {
        const id = req.params.id;
        console.log(id);
        const newData = {};

        if (req.body.name) newData.name = req.body.name;
        if (req.body.address) newData.description = req.body.address;
        if (req.body.birth_date) newData.birth_date = req.body.birth_date;
        if (req.body.hobbies) newData.hobbies = req.body.hobbies;
        if (req.body.gender) newData.gender = req.body.gender;
        if (req.body.college) newData.college = req.body.college;
        User.findByIdAndUpdate(
            { _id: id },
            { $set: newData },
            {
                new: true,
            }
        )
            .then((data) => {
                console.log(data);
                res.status(200).json({ message: " updated", data: data });
            })
            .catch((err) => {
                console.log(err);
            });
    },
    //deleting perticular user
    deleteUser: async (req, res) => {
        const user_id = req.params.id;
        console.log(user_id);
        try {
            //finding perticular user and delete user by its id
            await User.findOneAndDelete({
                _id: user_id,
            });
            res.status(200).send("deleted");
        } catch (err) {
            res.status(500).send("server error");
            console.log(err.massage);
        }
    },
};
