const { Thought } = require ('../models');

module.exports = {
    // Get all thoughts using find method
    async getAllThought(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get single thought using findOne method
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.id });
        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    }, 
    // Create a thought using create method
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    }, 
    // Update a thought using findOneAndUpdate method
    // ??
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true, new: true }
            );
        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID'});
        }
        res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Remove a thought using findOneAndDelete
    async removeThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.id });
        if(!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }
            res.json({ message: 'Thought deleted'})
        } catch (err) {
            res.status(500).json(err);
        }
    }, 
    // Create a reaction
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: {
                    reactions: {
                        reactionBody: req.body.reactionBody,
                        username: req.body.username
                    }
                }},
                { runValidators: true, new: true }
            );
        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID'});
        }
        res.json(thought);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    }, 
    // Delete a reaction
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: {
                    reactions: {
                        reactionId: req.params.reactionId
                    }
                }},
                { new: true }
            );
        if(!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }
            res.json({ message: 'Reaction deleted'})
        } catch (err) {
            res.status(500).json(err);
        }
    },                      
};