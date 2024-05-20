const dotenv = require('dotenv')

dotenv.config()


module.exports.DB_STRING=process.env.NODE_ENV === 'test'    
                        ?process.env.TEST_DB_STRING
                        :process.env.DB_STRING
module.exports.JWT_SECRET=process.env.JWT_SECRET!==undefined?process.env.JWT_SECRET:null