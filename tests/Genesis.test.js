const Genesis = require('../src/Genesis');

const expectedData = {
    utxos: [],
    receiver_public_keys: [
      '-----BEGIN PUBLIC KEY-----\n' +
        'MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAl20HC7xKreGy16YVuvNQ\n' +
        'heMJc62hLEs4S6iElS98cx6aHGJI3YAmahiB1uAdyX7unWtlwdeeKpdDtZ9b1XS9\n' +
        'R/kJi1vuJcmwTVAnDUCXWKd681+x3iSxnYT7tfSTzwbo3GWeTxnul3rWkd6EO546\n' +
        'hFSLQRI2zoDzOiEe7emb6gAW3PGHsyDAzDI+v2tThLIpJIaM2We6m0RoFxIDgDqX\n' +
        'ORWS/V8i3UhAn1Ha5MMpowP+ajk8DOwOz2DsgtAn2930FmRK4ciJOpFV4d/1Y+qr\n' +
        'poSWMIOwyuO2iZLve/3SXP3ariyhxnd7gMmM0OWWX/9qNiQ5T8Fx6H8nolMyfg/k\n' +
        'cm7GCajczxGy8MEUvx4OfVxoxL0g2dxa9O9ZPEjx4M5HExsk/jM1kCiBThcL04BX\n' +
        'xHjMehdDWnPYDxmhXv5LZveYrobsrqJmHESI3Whp0n9vjUqSo2ugPsJI+DbQF5JI\n' +
        'plnU1bmTfO1W7ynzIw5Ry5Td7o2RhSXyk6zCtYvtrHXQt4pflaWJzrq8h2TeKU/n\n' +
        'G30sfQvpWy5KDLBI/71cZnqslChcQ6tnYSNStXS0o3aWhYAkIPI+ByKNiBKXX82V\n' +
        'vQQ14WELBorYCiGiDginapgUC7uKIVaj0nLEBbyim1jrnCWhsGbBK41tF7bPBRo/\n' +
        '8SHuIBtSTPi+L3MkAEfkklsCAwEAAQ==\n' +
        '-----END PUBLIC KEY-----'
    ],
    messages: [ 50 ],
    signature: null
  }

describe('genesisCoinbase function', () => {
    it('should return an instance of Coinbase with the provided public key and messages', () => {
        const coinbase = Genesis.genesisCoinbase();

        expect(coinbase).toBeDefined(); 
        expect(typeof coinbase).toBe('object');
        expect(coinbase).toEqual(expectedData);
    });
});

