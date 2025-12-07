import mongoose from 'mongoose';

export const connectDB = async () => {
    const uri = process.env.MONGO_URI || 'mongodb+srv://KhaanaExpress_db:Lavish262@khaanaexpress.3fgokxv.mongodb.net/?appName=KhaanaExpress';
    try {
        // Some older connection strings (or .env values) may include unsupported query params
        // (e.g., useNewUrlParser or useUnifiedTopology). Strip those out for newer drivers.
        const sanitized = uri.replace(/([?&])(useNewUrlParser|useUnifiedTopology)=[^&]*/gi, '').replace(/[?&]$/,'');
        await mongoose.connect(sanitized);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        throw err;
    }
}