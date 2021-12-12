import {  Schema } from 'mongoose';
import mongoose from 'mongoose';

import { UserType } from 'src/types/auth';



const userSchema = new Schema<UserType> ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tests: [{
        type: Schema.Types.ObjectId,
        ref: 'Test' //store reference to the Post model
    }]
})




module.exports = mongoose.model<UserType>('User', userSchema)