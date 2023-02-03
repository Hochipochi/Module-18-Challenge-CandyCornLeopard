const router = require('express').Router();

// const for all routes/variables to be required
const {
    getUser,
    getIndvUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

// getall users and post
router.route('/').get(getUser).post(createUser);

// get one user, put and delete user by id
router.route('/:userId')
    .get(getIndvUser)
    .put(updateUser)
    .delete(deleteUser);




// post and delete friends by their Id
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;