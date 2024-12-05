import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "title required!"]
    },
    password: {
        type: String,
        required: [true, "author required!"]
    },
    fullname: {
        type: String,
        required: [true, "Fullname required!"]
    },
    contactNo: {
        type: String,
        required: [true, "Contact No. required!"]
    },
    address: {
        type: String,
        required: [true, "Address required!"]
    },
    occupation: {
        type: String,
        required: [true, "Occupation required!"]
    }
});

const User = mongoose.model('User', userSchema, 'users');

export default User;