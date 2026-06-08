const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const cookieParse = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;

/* database connection */
mongoose.connect(DB_URL)
.then(() => console.log(`DB connected.`))
.catch(() => console.log("Failed to connect DB."))

/* middlewares */
app.use(cors({
    origin:'*'
}))
app.use(express.json());
app.use(cookieParse());

/* all routes */
app.use('/user', userRoutes);

app.listen(PORT ,() =>{
    console.log(`Server is running on ${PORT}.`)
})