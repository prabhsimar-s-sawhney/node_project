const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxlength: 30
    },
    lastName: {
        type: String,
        maxlength: 30
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        immutable: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true
    },
    age: {
        type: Number,
        min: [16, 'You must be atleast 16 years old'] 
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Others']
    },
    photoURL: {
        type: String,
        trim: true
    },
    aboutMe: {
        type: String,
        default: "Hey Everyone! I am a Software Developer keen to learn and grow",
        maxlength: 240
    },
    skills: {
        type: [String],
        validate: {
            validator: function (value) {
                if (value.length > 5) {
                    throw new Error("Please select 5 or fewer core skills.")
                }
            }
        }
    },
}, {timestamps: true})

const User = mongoose.model("User", userSchema);

module.exports = {User};