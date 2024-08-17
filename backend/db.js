const mongoose = require('mongoose');
// const mongoURI = "mongodb://localhost:27017/inotebook";
const dotenv = require('dotenv')
dotenv.config();


const connectToMongo = async () => {
    try {
        await mongoose.connect( process.env.MONGO_URI);
        console.log("Connected to Mongo Successfully");
    } catch (error) {
        console.error("Error connecting to Mongo:", error);
    }
};

module.exports = connectToMongo;
