import mongoose = require('mongoose')

const MONGOOSE_URI: string  = 'mongodb://127.0.0.1:27017/typescriptExp'

export const connectDb = async () => {
    try{
        await mongoose.connect(MONGOOSE_URI)
        console.log('Database connected')
    }catch(e){
        console.log(e)
    }
}

