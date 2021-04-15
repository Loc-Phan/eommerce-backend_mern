const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec(async (error, user) => {
            if (user)
                return res.status(400).json({
                    message: 'User already exists'
                });
            const {
                firstName,
                lastName,
                email,
                password
            } = req.body;
            const hash_password = await bcrypt.hash(password, 10);
            const _user = new User({
                firstName,
                lastName,
                email,
                hash_password,
                username: Math.random().toString()
            });
            // console.log(_user);
            _user.save((error, data) => {
                if (error) {
                    return res.status(400).json({
                        message: 'Something went wrong'
                    });
                }
                if (data) {
                    return res.status(200).json({
                        message: 'Register successfully!'
                    });
                }
            })
        });
};