const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL)
.then(() => console.log(`DB connected.`))
.catch(() => console.log("Failed to connect DB."))

app.use(cors({
    origin:'*'
}))
app.use(express.json());

app.listen(PORT ,() =>{
    console.log(`Server is running on ${PORT}.`)
})