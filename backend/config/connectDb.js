import mongoose from "mongoose"

const connectDb = () => {
    mongoose.connect(process.env.DB, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }).then((data) => {
        console.log(`MongoDb connected to server: ${data.connection.host}`)
    }).catch((error)=>{
        console.log(error)
    })
}

export default connectDb;