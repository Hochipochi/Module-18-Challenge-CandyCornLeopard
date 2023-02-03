// require mongoose
const { connect, connection } = require('mongoose');

// mongodb host string
// changed url due to newer version of node
const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/CandyCornLeopard';

connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// export connection
module.exports = connection;