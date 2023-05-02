require('dotenv').config();
require('express-async-errors')

const express = require('express');
const app = express()

const connectDB = require('./db/connect')
const notFound = require('./middleware/pageNotFound');
const errorHandlerMiddleware = require('./middleware/errorHandler');
// const productRouter = require('./routes/products')
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')
connectDB(process.env.MONGO_URI);
const authenticationUser = require('./middleware/authentication')

// extra security 
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

// app middleware
app.use(express.static('./public'))
// app.use(express.json())

// routes

// app.get('/', (res, req) =>{
//     res.send('<h1>Job Api</h1>s')
// })

// route Middleware
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticationUser, jobsRouter); 

// error handling middleware
app.use(notFound)
app.use(errorHandlerMiddleware)

// security middleware
app.set('trust proxy', 1)
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(rateLimiter({
    windowMs:15 * 60 * 1000, //15 minutes
    max:100, // limit each IP to 100 request per windowMs
}))



const port =  3000 ;
app.listen(port, console.log( `listening to port ${port} ....`))