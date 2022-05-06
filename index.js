const express = require('express');
// require('dotenv').config();
// const cors = require('cors');
// const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
//Middle ware
// app.use(cors())
// app.use(express.json());

//From Mongodb Connect

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ajhar41:hHNLa4RoV7D5rBge@cluster0.vm5vj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const serviceCollection = client.db('tirezCycle').collection('products');
        //find or get data
        app.get('/products', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })

        //find one service 
        // app.get('/products/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const service = await serviceCollection.findOne(query);
        //     res.send(service);
        // })


    } finally {

    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send("Server is running")
})

app.listen(port, () => {
    console.log("Tirez server is running in ", port);
})

//hHNLa4RoV7D5rBge
//ajhar41