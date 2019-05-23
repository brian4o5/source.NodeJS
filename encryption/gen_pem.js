var fs = require('fs');
const forge = require('node-forge');

var keypair = forge.pki.rsa.generateKeyPair({bits: 2048, e: 0x10001});
const priv = forge.pki.privateKeyToPem(keypair.privateKey);
const pub = forge.pki.publicKeyToPem(keypair.publicKey);
fs.writeFileSync('./private.pem',Buffer.from(priv));
fs.writeFileSync('./public.pem',Buffer.from(pub));