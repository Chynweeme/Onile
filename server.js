import express from "express"
import mysql from "mysql"
import dotenv from "dotenv"
import createProperty from "./routes/propertyRoute.js"
import createUser from './routes/userRoute.js'

dotenv.config();



//making express an app
const app = express();

app.use(cors({
    origin: "*"
}));

const port = process.env.PORT || 3000

app.get('/',(req,res)=>{
    res.send('Welcome to Onile website!!')
})

app.use('/property', createProperty)
app.use('/', createUser)

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