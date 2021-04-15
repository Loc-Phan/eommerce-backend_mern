const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 2,
        max: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 1,
        max: 20
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hash_password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'admin'
    },
    contactNumber: {
        type: String
    },
    profilePicture: {
        type: String
    }
}, { timestamps: true });


userSchema.methods = {
    authenticate: (password) => {
        return bcrypt.compareSync(password, this.hash_password);
    }
}

module.exports = mongoose.model('User', userSchema);