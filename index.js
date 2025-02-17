const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

/**
 * Routes link
 */
const signUp = require('./routes/signUp');


/**
 * MiddleWares 
*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/**
 * Routes
 */
app.use("/signup", signUp);


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongo_uri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
        process.exit(1);
    }
};

const startServer = async () => {
    await connectDB();
    const PORT = process.env.port;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};


module.exports = { app, startServer };