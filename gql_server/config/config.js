const dotenv = require('dotenv')

dotenv.config()


module.exports.DB_STRING=process.env.DB_STRING!==undefined?process.env.DB_STRING:null
module.exports.JWT_SECRET=process.env.JWT_SECRET!==undefined?process.env.JWT_SECRET:null