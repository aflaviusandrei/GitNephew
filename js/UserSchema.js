var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
  username: {type: String, lowercase: true, unique: true, required: [true, "no blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
  //email: {type: String, lowercase: true, unique: true, required: [false, "no blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
  password: String,
}, {timestamps: true});

var gitDataSchema = new mongoose.Schema({
  parent: {type: String},
  projectNames: { type: Array },
  projectCount: { type: Number }
});

UserSchema.plugin(uniqueValidator, {message: 'already exists.'});

module.exports = {
  user: mongoose.model('user', UserSchema),
  gitData: mongoose.model('gitData', gitDataSchema)
};