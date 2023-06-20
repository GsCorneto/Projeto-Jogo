const express = require('express');
const db = require('./conn.js');

const router = express.Router();

// Registrar um novo resultado
router.post("mongodb://127.0.0.1:27017", async (req, res) => {
      let col = await db.collection('score');
      let out = await col.insertOne(req.body)
      res.send(out).status(204);
    });


// Pegar os 10 melhores resultados
router.get("mongodb://127.0.0.1:27017", async (req, res) => {
    let col = await db.collection('score');
    let out = await col.find().sort({
        pontos: -1
    }).limit(10).toArray();
    res.send(out).status(200);
});

module.exports = router;
