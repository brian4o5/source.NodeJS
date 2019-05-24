var fs = require('fs');
const forge = require('node-forge');

var b = fs.readFileSync('private.pem','utf8');
var pem = b.toString('utf8');
var priv = forge.pki.privateKeyFromPem(pem);
var pub =  forge.pki.setRsaPublicKey(priv.n,priv.e);
var encrypted = forge.util.encode64(pub.encrypt(forge.util.encodeUtf8('test123')));
console.log(encrypted);

var enc =forge.util.decode64(encrypted);

console.log('size: ' + enc.length + " = " + enc);
console.log('decoded: ' + priv.decrypt(enc));