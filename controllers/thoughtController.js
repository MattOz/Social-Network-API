const { User, Thought } = require('../models');

module.exports = {

    // get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

    // get one thought by _id
    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought with this ID" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // post new thought and add to user's thoughts array
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id } },
                    { runValidators: true, new: true }
                )
            })
            .then((user) =>
                !user
                    ? res.status(200).json({ message: "Thought added" })
                    : res.json(user)
            )
            .catch((err) => { res.status(500).json(err); });
    },

    // update thought by _id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought with this ID" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // delete thought by _id
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // post reaction to thought
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought with this ID" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // delete reaction by reactionId
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
}