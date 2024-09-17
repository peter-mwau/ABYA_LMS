const IPFS = require('ipfs-core');
const OrbitDB = require('orbit-db');
const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

let db;

async function startOrbitDB() {
  const ipfs = await IPFS.create();
  const orbitdb = await OrbitDB.createInstance(ipfs);
  db = await orbitdb.docs('abyadb');
  
  console.log('OrbitDB started and database is ready.');
}

startOrbitDB();

app.post('/add', async (req, res) => {
  try {
    const data = req.body;
    const hash = await db.put(data);
    res.send({ hash });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.get('/get/:key', async (req, res) => {
  try {
    const key = req.params.key;
    const result = await db.get(key);
    res.send(result);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.listen(port, () => {
  console.log(`OrbitDB service listening at http://localhost:${port}`);
});
