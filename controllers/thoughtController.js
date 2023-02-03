const { User, Thoughts } = require("../models");


module.exports = {
    getThought(req, res) {
        Thoughts.find({})
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },



    getIndvThought(req, res) {
        Thoughts.findOne({ _id: req.params.thoughtId })
            .select("-__v")
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },

    createThought(req, res) {
        Thoughts.create(req.body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then((thought) =>
                !thought
                    ? res.json({ message: "Thought Created!" })
                    : res.status(404).json({ message: "Incorrect ID." })
            )
            .catch((err) => res.status(500).json(err));
    },

    updateThought(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, New: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "Incorrect ID." })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteThought(req, res) {
        Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "Incorrect ID." })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true }
                    )
            )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'Thought deleted, but no user found.' })
                    : res.json({ message: 'Thought deleted.' })
            )
            .catch((err) => res.status(500).json(err));
    },

    createReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "Incorrect ID." })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "Incorrect ID." })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
};