import mongoose from "mongoose"


export const connectDB = async ()=>{
    try{

        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`connect to DB: ${connect.connection.host}`)
    }
    catch(error){
        console.error(error.message)
        process.exit(1);
    }
}