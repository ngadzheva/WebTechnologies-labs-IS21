import * as mongoose from 'mongoose';

const connectDb = () => {
    return mongoose.connect(process.env.LOCAL_DB_URL);
};

export default connectDb;