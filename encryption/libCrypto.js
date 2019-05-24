var fs = require('fs');
const forge = require('node-forge');

const libCrypto = {

getRsaKeyPair()
{
    if(!fs.existsSync('./rsa_private.pem'))
    {
        var keypair = forge.pki.rsa.generateKeyPair({bits: 2048, e: 0x10001});
        var priv = forge.pki.privateKeyToPem(keypair.privateKey);
        const pub = forge.pki.publicKeyToPem(keypair.publicKey);
        fs.writeFileSync('./rsa_private.pem',Buffer.from(priv));
        fs.writeFileSync('./rsa_public.pem',Buffer.from(pub)); 
        return keypair;
    }
    else
    {
        var pem = fs.readFileSync('./rsa_private.pem','utf8').toString('utf8');
        var privateKey = forge.pki.privateKeyFromPem(pem);
        var publicKey = forge.pki.setRsaPublicKey(privateKey.n,privateKey.e);
        if(pem)
            return { privateKey, publicKey };
    }
    return null;
},
//load or generate a new self-signed cert for HTTPS dynamically!
getHttpsCert()
{
    var keys;
    if(!fs.existsSync('./server.key'))
    {
        keys = forge.pki.rsa.generateKeyPair({bits: 2048, e: 0x10001});
        var cert = forge.pki.createCertificate();
        cert.publicKey = keys.publicKey;
        cert.serialNumber = '01';
        cert.validity.notBefore = new Date();
        cert.validity.notAfter = new Date();
        cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear()+1);

        var attrs = [
            {name:'commonName',value:'example.org'}
            ,{name:'countryName',value:'US'}
            ,{shortName:'ST',value:'OK'}
            ,{name:'localityName',value:'Edmond'}
            ,{name:'organizationName',value:'MyCompany'}
            ,{shortName:'OU',value:'test'}
        ];
        cert.setSubject(attrs);
        cert.setIssuer(attrs);
        cert.sign(keys.privateKey);

        var https_key = forge.pki.privateKeyToPem(keys.privateKey);
        var https_cert = forge.pki.certificateToPem(cert);
        fs.writeFileSync('./server.key',Buffer.from(https_key));
        fs.writeFileSync('./server.cert',Buffer.from(https_cert));
        keys = {https_key,https_cert};
    }
    else
    {
        var https_key = fs.readFileSync('./server.key','utf8').toString('utf8');
        var https_cert = fs.readFileSync('./server.cert','utf8').toString('utf8');
        keys = {https_key,https_cert};
    }
    return keys;
}

}

module.exports = libCrypto;