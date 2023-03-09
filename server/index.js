const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "04f288d30ca4ff9ccab843e96f87bd5f73ae6f01eaee77c7e4846fd90456af593c3ebbe715f91bab5d490e3fbbed01d1c3f3e6be6979c950d564aec2e10c7b8893": 150,
  "0411a5c6feee221aabfbb140bb4785cdd47f1dfa872da4025a3238edac53adaed48284d90a180a4770b5de13114f9ee8d387dce15993116d2338e547f3fec74b25": 560,
  "04ce0f9e61f4034d3a18e09f32ecaaa7f7fdcea3e099e98b37db5cf3c8fa40039dfb0bceda4a92a3fa270deed5a2db8854127f3126d5eea7be45d82bf617132dda": 800,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
