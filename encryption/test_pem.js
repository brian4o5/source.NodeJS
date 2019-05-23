var fs = require('fs');
const forge = require('node-forge');

var b = fs.readFileSync('private.pem','utf8');
var pem = b.toString('utf8');
var priv = forge.pki.privateKeyFromPem(pem);
var pub =  forge.pki.setRsaPublicKey(priv.n,priv.e);
var encrypted = pub.encrypt(forge.util.encodeUtf8('test123'));
console.log(forge.util.encode64(encrypted));

var enc =forge.util.decode64(`g+VUj80M1QWHCX8Y5QjtuNNFUxf2mNlwqAhsi8iiRrLB3IbK/Sr9n7pX+qyJTsjgHzTS3rp2AED+yGC16ziWoV3206hw2X1wpTLxdvHXsgvshylG3MzmgWDoa1/n0+t7vnVPIUZF23iUQ9C7HHgutI5q6/GFd3PkXiVyWjK0iDdYPDdRrZIaTm9VxdOx5WaGOIcZQWWtCPvGrESW0JCRsHstiftXD5H2Ge8VwgB6NjwT6rP7eYXDeYUfWV4RzLg7UF8RRbCQq8Wan74dt4MF88h2boKPxmESCISXSM4zw74do+E6DNra44p4eGK0UWjN6f/QXF8NektrO4O1qKYakQ==`);

console.log('size: ' + enc.length + " = " + enc);
console.log('decoded: ' + priv.decrypt(enc));