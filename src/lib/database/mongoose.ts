import mongoose,{Mongoose} from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL 
interface MongooseConnection {
    conn:Mongoose | null;
    promise:Promise<Mongoose> | null;
}

let cached:MongooseConnection=(global as any).mongoose;

if(!cached){
    cached=(global as any).mongoose={
        conn:null,
        promise:null
    }
}


export const connectToDatabase=async()=>{
    if(cached.conn){
        return cached.conn;
    }
    if(!MONGODB_URL){
        throw new Error("Missing mongoDb url");
    }

    cached.promise=cached.promise||mongoose.connect(MONGODB_URL,{
       dbName:'Imagenary',
       bufferCommands:false,
    });
    cached.conn=await cached.promise;
    return cached.conn;
}


//due to the server less nature of next js we have to do all 
//this setup to ensure that we have a single connection to 
//the database because next js makes a connection every single
// time a request is made to the server and if we dont optimize
// this we will have multiple connections to the database which 
//is not good for the performance of the application