const { Schema, model } = require('mongoose');

// Schema to create thought Model
const thoughtSchema = new Schema (
	{
		thoughtText: {
			type: String,
			required: true,
			minLength: 1,
            maxLength: 280
		},
		createdAt: {
			type: Date,
			timestamps: true,
            // set default value to the current timestamp
            // add getter method
		},
		username: {
			type: String,
			required: true
		},
        // ?? is this correct?
		reactions: {
			type: Schema.Types.ObjectId,
			ref: "thought"
		}
	},
	{
		toJSON: {
			virtuals: true,
		}
	}
);

// Virtual that retrieves the length of thought's reactions array field on query
thoughtSchema
	.virtual('reactionCount')
	// Getter
	.get(function () {
		return `${this.reactions.length}`;
	});

// Initialize thought model
const thought = model('thought', thoughtSchema);

// Export thought Module
module.exports = thought;