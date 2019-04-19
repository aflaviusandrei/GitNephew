var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
  username: {type: String, lowercase: true, unique: true, required: [true, "no blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
  email: {type: String, lowercase: true, unique: true, required: [false, "no blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
  password: String,
}, {timestamps: true});

var gitDataSchema = new mongoose.Schema({
  userData: {
		name: { type: 'Mixed'},
		location: { type: 'String'},
		repos: {type: 'Number'},
		followers: { type: 'Number'},
		avatar_url: { type: 'String'},
    login: {type: 'String'},
    bunic: {type: 'String'}
	},
	repoData: { type: ['Mixed']},
	eventsData: {
    totalPushes: {type: 'Number'},
		totalCommits: {type: 'Number'},
		lastActivity: {type: 'Date'},
		raw: {type: ['Mixed']}
  },
  bunic: {type: 'String'}
});

UserSchema.plugin(uniqueValidator, {message: 'already exists.'});

module.exports = {
  user: mongoose.model('user', UserSchema),
  gitData: mongoose.model('gitData', gitDataSchema)
};