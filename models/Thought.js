const { Schema, model, Types } = require('mongoose');
const dayjs = require('dayjs');

// Schema for reactions
const reactionSchema = new Schema (
	{
		reactionId: {
			type: Schema.Types.ObjectId,
			default: () => new Types.ObjectId(),
		},
		reactionBody: {
			type: String,
			required: true,
			maxLength: 280,
		},
		username: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: (date) => {
				return dayjs(date).format('LLL');
			},
		},
	}
);


// Schema to create thought Model
const thoughtSchema = new Schema (
	{
		thoughtText: {
			type: String,
			required: true,
			minLength: 1,
            maxLength: 280,
		},
		createdAt: {
			type: Date,
			default: Date.now,
            get: (date) => {
				return dayjs(date).format('LLL');
				// add dayjs
			}
		},
		username: {
			type: String,
			required: true,
		},
		reactions: [reactionSchema],
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