const mongoose = require('mongoose')

MONGOOSE_URI  = 'mongodb://127.0.0.1:27017/typescriptExp'

const connectDb = async () => {
    try{
        await mongoose.connect(MONGOOSE_URI)
        console.log('Database connected')
    }catch(e){
        console.log(e)
    }
}

module.exports = connectDb
