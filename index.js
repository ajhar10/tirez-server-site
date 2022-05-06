const express = require('express');
// require('dotenv').config();
// const cors = require('cors');
// const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
//Middle ware
// app.use(cors())
// app.use(express.json());


app.get('/', (req, res) => {
    res.send("Server is running")
})

app.listen(port, () => {
    console.log("Tirez server is running in ", port);
})