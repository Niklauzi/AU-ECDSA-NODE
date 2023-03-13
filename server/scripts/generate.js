const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");


const privateKey = secp.utils.randomPrivateKey();

console.log('private key:', toHex(privateKey));
const publicKey = secp.getPublicKey(privateKey);

console.log('public key:', toHex(publicKey));

const address =  keccak256(publicKey.slice(1)).slice(-20);

console.log('Address:', toHex(address));
/*
private key: 2bd980bc7ce5b2dfec2bc8e458a3572d1fcd1c7cae5a96aea8d685c5ee4fe9d9
public key: 04f288d30ca4ff9ccab843e96f87bd5f73ae6f01eaee77c7e4846fd90456af593c3ebbe715f91bab5d490e3fbbed01d1c3f3e6be6979c950d564aec2e10c7b8893
Address: 1474f4616662d25a7fa453d988cf63239ed57fdf

private key: a83b65e29d8e14a16e140d9dda0752028ffa54dbf1be455c4d2d3e4efc5dc20c
public key: 0411a5c6feee221aabfbb140bb4785cdd47f1dfa872da4025a3238edac53adaed48284d90a180a4770b5de13114f9ee8d387dce15993116d2338e547f3fec74b25
Address: a3faae15056c7aca7731f208cdc91c0581513d46

private key: 29cc47c2ed6776f323e22ddd90cc3627f663d894e3d25cac09e65ba2a7f3b028
public key: 04ce0f9e61f4034d3a18e09f32ecaaa7f7fdcea3e099e98b37db5cf3c8fa40039dfb0bceda4a92a3fa270deed5a2db8854127f3126d5eea7be45d82bf617132dda
Address: 7b3962552187cde49ca8e160f07ddba0cdeeadc1
*/
// app.get('/balance/:address', (req, res) => {
//     const { address } = req.params;
//     console.log(address);
//     console.log(balances);
//     const balance = balances[address] || 0;
//     console.log(balance);
//     res.send({ balance });
//   });
//   const dataValidation = async (req, res, next) => {
//     try {
//       if (!req.body.data.recipient) throw new Error('Specify the sender!');
//       const isValidBalance = +req.body.data.amount > 0;
//       if (!isValidBalance) throw new Error('Invalid Amount');
//     } catch (error) {
//       return res.status(400).send({ message: error.message });
//     }
//     next();
//   };
  
//   app.post('/send', dataValidation, (req, res) => {
//     const { messageHash, signedResponse, data } = req.body;
//     const amount = data.amount;
//     const sender = data.sender;
//     setInitialBalance(data.sender);
//     setInitialBalance(data.recipient);
//     const isValid = isValidSender(messageHash, signedResponse, sender);
//     if (!isValid) return res.status(400).send({ message: 'Not a valid sender!' });
  
//     if (balances[sender] < amount) {
//       res.status(400).send({ message: 'Not enough funds!' });
//     } else {
//       balances[sender] -= amount;
//       balances[data.recipient] += amount;
//       res.send({ balance: balances[sender] });
//     }
//   });
  
//   app.listen(port, () => {
//     console.log(`Listening on port ${port}!`);
//   });
  
//   function setInitialBalance(address) {
//     if (!balances[address]) {
//       balances[address] = 0;
//     }
//   }
//   const isValidSender = (messageHash, signedResponse, sender) => {
//     const signature = Uint8Array.from(Object.values(signedResponse[0]));
//     const publicKey = secp.recoverPublicKey(
//       messageHash,
//       signature,
//       signedResponse[1]
//     );
//     const isSigned = secp.verify(signature, messageHash, publicKey);
  
//     const isValidSender =
//       sender.toString() === getAddressFromPublicKey(publicKey);
//     console.log(sender, getAddressFromPublicKey(publicKey));
//     if (!isValidSender && isSigned) return false;
//     return true;
//   };
  
//   const getAddressFromPublicKey = (pk) => {
//     console.log(pk);
//     const walletAddress = utils.toHex(pk.slice(1).slice(-20));
//     return walletAddress.toString();
//   };