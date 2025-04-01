import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { userRouter } from './routes/userRouter.js';
import { productRouter } from './routes/productRouter.js';
import { dataBaseConnection } from './config/db.js';
import { reviewRouter } from './routes/reviewRouter.js';

//dotenv config
dotenv.config();


//app config
const app = express();
const PORT = process.env.PORT || 5050;

// middlewares

app.use(express.json({limit: '60mb'}))
app.use(express.urlencoded({extended: true, limit: '60mb'}))
app.use(cors({
    origin: "*"
}))

//db connection
dataBaseConnection()



//routes
app.get('/', async(req, res) => res.send("Express Backend Connected"))
app.use('/api/user', userRouter)
app.use('/api/products', productRouter)
app.use('/api/review', reviewRouter)



// listen server
app.listen(PORT, () => {
    console.log(`Server Running on the port ${PORT}`)
})
