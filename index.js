const express = require('express')
const app = express()
const apiRoutes = require('./routes/index')
const { connectDB } = require('./config/db/connection')
const cors = require('cors')

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Connect to db
connectDB()
app.use('/api',apiRoutes)

const PORT= 3000
app.listen(PORT,()=>console.log(`Server is running on ${PORT} Port`));