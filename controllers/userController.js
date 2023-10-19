const { User } = require ('../models');

module.exports = {
    // Get all users using find method
    async getAllUser(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get single user using findOne method
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }, 
    // Create a user using create method
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }, 
    // Update a user using findOneAndUpdate method
    // ??
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true, new: true }
            );
        if (!user) {
            return res.status(404).json({ message: 'No user with that ID'});
        }
        res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Remove a user using findOneAndDelete
    async removeUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.id });
        if(!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }
            res.json({ message: 'User deleted'})
        } catch (err) {
            res.status(500).json(err);
        }
    }, 
    // Add a friend
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $push: {
                    friends: req.params.friendId
                }},
                { runValidators: true, new: true }
            );
        if (!user) {
            return res.status(404).json({ message: 'No user with that ID'});
        }
        res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }, 
    // Remove a friend
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndDelete(
                { _id: req.params.userId },
                { $pull: {
                    friends: req.params.friendId
                }},
                { new: true }
            );
        if(!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }
            res.json({ message: 'Friend deleted'})
        } catch (err) {
            res.status(500).json(err);
        }
    },                      
};