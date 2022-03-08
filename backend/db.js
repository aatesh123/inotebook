
const mongoose=require('mongoose')
// mongodb compass connection /inotebook to craete database name
const mongoURI="mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false"
//connect mongodb with mongoose
const  connectToMongo =()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to Mongo Successfully")
    })
}
module.exports = connectToMongo;