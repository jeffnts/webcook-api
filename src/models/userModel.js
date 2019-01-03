import mongoose from 'mongoose'
const Schema = mongoose.Schema
import bcrypt from 'bcryptjs'

const userSchema = new Schema({

    name:{
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    email : {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        validate: function(email) {
            return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
        }

    },
    password:{
        type: String,
        required: true,
        select: false
    },
    role:{
        type: String,
        required: true,
        enum:[
            'user',
            'admin'
        ],
        default: 'user'
    },
    photo:{
        type: String,
        default: 'avatar'
    },
    recipes: [
        {   type: Schema.Types.ObjectId,
            ref: 'Recipe'

        }

    ]


});
// Auth settings with Brcypt
    userSchema.pre('save', function hashPassword(next) {
        if (this.isModified('password')) {
            this.encryptPassword(this.password)
                .then(hash => {
                    this.password = hash;
                    next();
                })
                .catch(err => next(err));
        } else {
            return next();
        }
    });

    userSchema.methods = {
        async authenticate(plainText) {
            try {
                return await bcrypt.compare(plainText, this.password);
            } catch (err) {
                return false;
            }
        },
        encryptPassword(password) {
            return bcrypt.hash(password, 8);
        },
    };


export default  mongoose.model('User', userSchema);