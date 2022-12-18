// npx ts-node openWallet.ts
import { walletFolder } from './constants';
import { decryptValue } from './utils/crypto';
import { openLastCreatedFromFolder } from './utils/filesystem';

const file = openLastCreatedFromFolder(walletFolder)
const decrypted = decryptValue(file.content);
console.log("file:", file);
//console.log("value: ", decrypted)