const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");


const privateKey = secp.utils.randomPrivateKey();

console.log('private key:', toHex(privateKey));

const publicKey = secp.getPublicKey(privateKey);

console.log('public key:', toHex(publicKey));

const nKey = publicKey.slice(1);
const address =  (keccak256(nKey)).slice(-20);

console.log('Address:', toHex(address));


// private key: 7166d154e02fd6098ea553e535b7faec596a6cfcfc5abd099c5bb03356e586da
// public key: 043b0509fdde65bdf56749180ca61c383cb7345c39f0850f116a5b233e08fec153630adebad78bf60e22dcf6ee3f5b99cda015ca23f0d3c7aee41699d501205219
// Address1: f0693196ca0e3a029f18ca5d4ee4309bb6313b3e

// private key: aff7d9700ee313888684e94f8d0138905a46b6373ce22d092c9c81460aedf287
// public key: 04b6de6fc15b4a715569401ec967d9e6dcaa5332d60757119dda8e15e60c01aad4d9ba3df208e18e1f3c88c9ed2e54278855e3da2f81a96b99ccb04de9e51f16c2
// Address2: 23f3255b6fc93334b15fda955776c6d5801c30ad

// private key: 7c0bfb9dd13df5c686e92882cd34b56aacb5d889426a4a5a3599970c83fb4514
// public key: 0438dc5f71745dcbe5b20ee30862d0d40447dbab9e95e6c01093669219260c79c5dfc864cd809e2d56769be4f332f275e3f6f1efe005df9dbd86cd2879a756fadf
// Address3: 1a301e716a4cf4231c2bbf9e1ea9113459ee413b