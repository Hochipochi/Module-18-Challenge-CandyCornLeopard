// require mongoose
const { connect, connection } = require('mongoose');

// mongodb host string
const connectionString =
    process.env.MONGODB_URI || 'mongodb://localhost:27017/inputURLhere';

connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// export connection
module.exports = connection;