const { Schema, model } = require('mongoose');

// Schema to create user Model
const userSchema = new Schema (
	{
		username: {
			type: String,
			// ?? is this correct for unique?
			unique: true,
			required: true,
			trim: true
		},
		email: {
			type: String,
			unique: true,
			required: true,
			// ?? is this validator correct?
			validate: {
				validator: () => Promise.resolve(false),
				message: 'Email validation failed'
			}
		},
		thoughts: {
			// ??
			type: Schema.Types.ObjectId,
			ref: "Thought"
		},
		friends: {
			// ??
			type: Schema.Types.ObjectId,
			ref: "User"
		}
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
		return `${this.friends.length}`;
		// do i need a setter?
	});

// Initialize User model
const User = model('user', userSchema);

// Export User Module
module.exports = User;