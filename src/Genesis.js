const { Coinbase } = require('./transaction'); 

const CREATORS_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAl20HC7xKreGy16YVuvNQ
heMJc62hLEs4S6iElS98cx6aHGJI3YAmahiB1uAdyX7unWtlwdeeKpdDtZ9b1XS9
R/kJi1vuJcmwTVAnDUCXWKd681+x3iSxnYT7tfSTzwbo3GWeTxnul3rWkd6EO546
hFSLQRI2zoDzOiEe7emb6gAW3PGHsyDAzDI+v2tThLIpJIaM2We6m0RoFxIDgDqX
ORWS/V8i3UhAn1Ha5MMpowP+ajk8DOwOz2DsgtAn2930FmRK4ciJOpFV4d/1Y+qr
poSWMIOwyuO2iZLve/3SXP3ariyhxnd7gMmM0OWWX/9qNiQ5T8Fx6H8nolMyfg/k
cm7GCajczxGy8MEUvx4OfVxoxL0g2dxa9O9ZPEjx4M5HExsk/jM1kCiBThcL04BX
xHjMehdDWnPYDxmhXv5LZveYrobsrqJmHESI3Whp0n9vjUqSo2ugPsJI+DbQF5JI
plnU1bmTfO1W7ynzIw5Ry5Td7o2RhSXyk6zCtYvtrHXQt4pflaWJzrq8h2TeKU/n
G30sfQvpWy5KDLBI/71cZnqslChcQ6tnYSNStXS0o3aWhYAkIPI+ByKNiBKXX82V
vQQ14WELBorYCiGiDginapgUC7uKIVaj0nLEBbyim1jrnCWhsGbBK41tF7bPBRo/
8SHuIBtSTPi+L3MkAEfkklsCAwEAAQ==
-----END PUBLIC KEY-----`;

function genesisCoinbase() {
    return new Coinbase(CREATORS_PUBLIC_KEY);
}

module.exports = {
    genesisCoinbase,
};
