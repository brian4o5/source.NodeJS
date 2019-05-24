var libCrypto = require('./libCrypto.js');
var forge = require('node-forge');


var keypair = libCrypto.getRsaKeyPair();
var priv = keypair.privateKey;
var pub =  keypair.publicKey;

var encrypted = forge.util.encode64(pub.encrypt(forge.util.encodeUtf8('test123')));
console.log(encrypted);

var enc =forge.util.decode64(encrypted);

console.log('size: ' + enc.length + " = " + encrypted);
console.log('decoded: ' + priv.decrypt(enc));