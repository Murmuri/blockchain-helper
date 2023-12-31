const BitcoreLibCash = require("bitcore-lib-cash");
import { AbstractBitcoreLibDeriver } from "../btc";
export class BchDeriver extends AbstractBitcoreLibDeriver {
  bitcoreLib = BitcoreLibCash;
  deriveAddress(
    network: string,
    pubKey: string,
    addressIndex: number,
    isChange: boolean
  ) {
    const xpub = new this.bitcoreLib.HDPublicKey(pubKey, network);
    const changeNum = isChange ? 1 : 0;
    const path = `m/${changeNum}/${addressIndex}`;
    return this.bitcoreLib
      .Address(xpub.derive(path).publicKey, network)
      .toString(true);
  }

  derivePrivateKey(
    network: string,
    xPriv: string,
    addressIndex: number,
    isChange: boolean
  ) {
    const xpriv = new this.bitcoreLib.HDPrivateKey(xPriv, network);
    const changeNum = isChange ? 1 : 0;
    const path = `m/${changeNum}/${addressIndex}`;
    const privKey = xpriv.deriveChild(path).privateKey;
    const pubKey = privKey.publicKey;
    const address = this.bitcoreLib.Address(pubKey, network).toString(true);
    return { address, privKey: privKey.toString(), pubKey: pubKey.toString() };
  }
}
