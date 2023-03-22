const { User, Thought } = require('../models');

module.exports = {
    // get all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    // get one user by _id
    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('thoughts')
            // .populate('friends')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user with this id" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // post a new user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    // update user by _id
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user with this id" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // delete user by _id
    // BONUS: delete user's thoughts when deleted
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user with this id" })
                    : Thought.deleteMany(
                        { userId: req.params.userId }
                    )
            )
            .then(() => res.json({ message: 'User deleted' }))
            .catch((err) => res.status(500).json(err));
    }

    // add Friend


    // delete Friend

};