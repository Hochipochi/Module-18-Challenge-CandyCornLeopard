const router = require('express').Router();

// const for all routes/variables to be required
const {
    getThought,
    getIndvThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');


// get all, post thought
router.route('/').get(getThought).post(createThought);

// thoughtId routes, get / put / delete individual thoughts
router.route('/:thoughtId')
    .get(getIndvThought)
    .put(updateThought)
    .delete(deleteThought);




//  thoughtId/reactions, post for reaction based on thoughtId
router.route('/:thoughtId/reactions')
    .post(createReaction);




// thoughtId/reactions/reactionId, delete based on reactionId

router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);


module.exports = router;