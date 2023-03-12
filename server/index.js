const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "1474f4616662d25a7fa453d988cf63239ed57fdf": 150,
  "a3faae15056c7aca7731f208cdc91c0581513d46": 560,
  "7b3962552187cde49ca8e160f07ddba0cdeeadc1": 800,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {

//   async function signMessage(msg) {
//     const messageHash = hashMessage(msg);
//     return secp.sign(messageHash, PRIVATE_KEY, { recovered: true });
// }

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
