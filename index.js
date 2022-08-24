const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://dbUser:1uQMQsAP7lKycYMw@cluster0.jnuk61m.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();

        const usersCollection = client.db("unique-form").collection("users");

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);
        })

        app.get('/users', async (req, res) => {
            const query = req.query;
            const users = await usersCollection.find(query).toArray();

            res.send(users);
        })

    }
    finally {
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Running my server');
})

app.listen(port, () => {
    console.log('my server is running');
})