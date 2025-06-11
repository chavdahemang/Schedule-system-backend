const mongoose = require('mongoose');
const MONGODB_URL = 'mongodb+srv://hemang:hemang123@cluster0.21ohcfq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

async function connectDB() {
    try {
        await mongoose.connect(MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 60000 * 5, // increase from the default 10s to 60s
        });
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);
        return process.exit(1);
    }
}

module.exports = {
    connectDB
}