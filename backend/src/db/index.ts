import * as dotenv from 'dotenv';
dotenv.config();
import * as mongoose from 'mongoose';

const mongoDB = `mongodb+srv://${process.env.MONGODB_ATLAS_USER}:${process.env.MONGODB_ATLAS_PASSWORD}@cluster0.kk4in.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(mongoDB);
mongoose.connect(mongoDB);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error: '));
