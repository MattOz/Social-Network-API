const connection = require('../config/connection');
const { User, Thought } = require('../models');
const seedData = require('./seedData.json');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    await User.deleteMany({});
    await User.collection.insertMany(seedData);
    console.table(userData);
    console.info('Seeding complete!');
})