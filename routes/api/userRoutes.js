const router = require('express').Router();
const { 
    getAllUser,
    getSingleUser,
    createUser,
    updateUser,
    removeUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController.js');

router.route('/')
    .get(getAllUser)
    .post(createUser);

router.route('/:id')
    .get(getSingleUser)
    .put(updateUser)
    .delete(removeUser);

router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;