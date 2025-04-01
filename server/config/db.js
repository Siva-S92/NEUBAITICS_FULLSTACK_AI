import mongoose from 'mongoose';

export async function dataBaseConnection(){
    
    try {
        mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected Succesfully");
    } catch (err) {
        console.log("Database Connection Failed", err);
    };
};