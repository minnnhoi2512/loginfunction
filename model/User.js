import mongoose, { ObjectId, Schema } from "mongoose";
import isEmail from "validator/lib/isemail.js";
export default mongoose.model('User',
    new Schema({
        id: { type: ObjectId },
        name: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.length > 3,
                message: 'Username must be at least 3 characters'
            }
        },
        email: {
            type: String,
            unique: true,
            validate: {
                
                validator: (value) => isEmail,
                message: 'Email is incorrect format or exist'
            }
        },
        password: {
            type: String,
            required: true,
        },
        address: {
            type: String,

        },
        phone: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            required: false,
        },


        gender: {
            type: String,
            enum: {
                values: ['Male', 'Female'],
                message: '{VALUE} is not supported'
            },
            required: true
        },
        description: {
            type: String,
            required: false,
        },
        roleId: {
            type: Number,
            default: 1,
            enum: {

                values: [1, 2, 3, 4],
                message: '{VALUE} is not supported'
            },

        },
        isActive:{
            type:  Number,
            default: 0,
            enum: {
                values: [0,1],
                message: '{VALUE} is not supported'
            },
        }
    })
)