const express=require('express');
const logger=require('morgan')
const connectDb = require('./db');
const port=4000;
const app= express();
app.use(logger('dev'))
const cors = require('cors');
app.use(cors({
    origin: '*',
    credentials: true, 
  }));
  
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(express.json());

app.use('/',require('./routes/Auth'))
// app.use(require('./middleware/jwt_verify'))

app.use('/',require('./routes/Deal'))






app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});



