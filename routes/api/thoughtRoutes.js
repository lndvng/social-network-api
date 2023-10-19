const router = require('express').Router();
const { 
    getAllThought,
    getSingleThought,
    createThought,
    updateThought,
    removeThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController.js');

router.route('/')
    .get(getAllThought)
    .post(createThought);

router.route('/:id')
    .get(getSingleThought)
    .put(updateThought)
    .delete(removeThought);

router.route('/:thoughtId/reactions')
    .post(createReaction)

router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;