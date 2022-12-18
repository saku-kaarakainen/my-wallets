// npx ts-node generatePrivateKey.ts
import * as bitcore from 'bitcore-lib-cash';
import { walletFolder } from './constants';
import { encryptValue } from './utils/crypto';
import { save } from './utils/filesystem';

const myWallet = generateWallet();
save(
    walletFolder, 
    myWallet.publicKey, 
    myWallet.encryptedPrivateKey
);

function generateWallet(): {
    encryptedPrivateKey: string;
    publicKey: string;
} {
    const privateKey = new bitcore.PrivateKey();
    return {
        encryptedPrivateKey: encryptValue(privateKey.toWIF()),
        publicKey: privateKey.toPublicKey().toString()
    }
}
