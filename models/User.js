const { Schema, model } = require('mongoose');

// Schema to create user Model
const userSchema = new Schema (
	{
		username: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
			match: [/.+@.+\..+/, "Not a valid email"],
		},
		thoughts: [
			{
			type: Schema.Types.ObjectId,
			ref: "thought",
			}
		],
		friends: [
			{
			type: Schema.Types.ObjectId,
			ref: "user",
			}
		]
	},
	{
		toJSON: {
			virtuals: true,
		}
	}
);

// Virtual that retrieves the length of user's friends array field on query
userSchema
	.virtual('friendCount')
	// Getter
	.get(function () {
		return this.friends.length;
	});

// Initialize User model
const User = model('user', userSchema);

// Export User Module
module.exports = User;