const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
//Middle ware
app.use(cors())
app.use(express.json());

//From Mongodb Connect
const uri = "mongodb+srv://ajhar41:hHNLa4RoV7D5rBge@cluster0.vm5vj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const productCollection = client.db('tirezCycle').collection('products');
        //find or get data
        app.get('/products', async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })

        //find one product 
        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const product = await productCollection.findOne(query);
            res.send(product);
        })

        // delete user
        app.delete('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await productCollection.deleteOne(query);
            res.send(result);
        })

        //reduce quantity
        app.put('/products/:id', async (req, res) => {
            const id = req.params.id;
            const updatedStock = req.body;
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true };

            const updateDoc = {
                $set: {
                    quantity: updatedStock.quantity,
                },
            };
            const result = await productCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })

        //add item
        app.post('/products', async (req, res) => {
            const newProduct = req.body;
            // console.log('Adding uew product', newProduct);
            const result = await productCollection.insertOne(newProduct);
            res.send(result);
        })

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