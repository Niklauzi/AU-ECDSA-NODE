const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes,toHex,hexToBytes } = require("ethereum-cryptography/utils");
const secp = require("ethereum-cryptography/secp256k1");

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
  const { messageHash, signedResponse, data} = req.body;
  const amount = data.amount;
  const sender = data.sender;

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

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
function hashMessage(message) {
  const bytes = utf8ToBytes(message);
  return keccak256(bytes);
}
function addressFromPublicKey(publicKey){
  const addrBytes = publicKey.slice(1);
  const hash = keccak256(addrBytes);
  return hash.slice(-20);
}

// const recovered = 
// secp.recoverPublicKey(messageHash, hexToBytes(sign), recoveryBit);

//   const addressOfSign = toHex(addressFromPublicKey(recovered));
//   console.log('addressOfSign:',addressOfSign)
