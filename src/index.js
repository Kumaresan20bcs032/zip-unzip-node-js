import express from 'express'
import env from 'dotenv'
import zipRouter from './routes/zip-unzip-router'
env.config()
const app=express()
app.use(express.json())

app.use('/api/v1',zipRouter)

app.listen(process.env.PORT,()=>{
    console.log(`server started at port:${process.env.PORT}`)
})