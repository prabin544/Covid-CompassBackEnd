const mongoose = require ('mongoose');
const keys = require('../config/keys');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(keys.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log(`connected to db: ${conn.connection.host}`)
    }catch (err){
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectDB