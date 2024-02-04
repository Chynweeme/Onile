import express from "express"
import dotenv from "dotenv"
import createProperty from "./routes/propertyRoute.js"
import createUser from './routes/userRoute.js'
import cors from "cors"
import { connectDB } from "./config/db.js"


dotenv.config();
connectDB();



//making express an app
const app = express();

app.use(express.json())

app.use(cors({
    origin: "*"
}));

const port = process.env.PORT || 3000


app.use('/property', createProperty)
app.use('/user', createUser)


app.get('/',(req,res)=>{
    res.send('Welcome to Onile website!!')
})

app.listen(port,()=>{
    console.log(`This project is running at ${port}`)
})

//creating a middleware
app.use(express.json());
app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next();

}

)