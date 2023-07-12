import rippleKeypairs from "ripple-keypairs";
import { IDeriver } from "..";

const BitcoreLib = require("bitcore-lib");

export class XrpDeriver implements IDeriver {
  deriveAddress(
    network: string,
    xpubkey: string,
    addressIndex: number,
    isChange: boolean
  ) {
    const xpub = new BitcoreLib.HDPublicKey(xpubkey, network);
    const changeNum = isChange ? 1 : 0;
    const path = `m/${changeNum}/${addressIndex}`;
    const pubKey = xpub.derive(path).toObject().publicKey;
    const address = rippleKeypairs.deriveAddress(pubKey);
    return address;
  }

  derivePrivateKey(
    network: string,
    xPriv: string,
    addressIndex: number,
    isChange: boolean
  ) {
    const xpriv = new BitcoreLib.HDPrivateKey(xPriv, network);
    const changeNum = isChange ? 1 : 0;
    const path = `m/${changeNum}/${addressIndex}`;
    const derivedXPriv = xpriv.derive(path);
    const privKey = derivedXPriv.toObject().privateKey.toUpperCase();
    const pubKey = derivedXPriv.hdPublicKey.toObject().publicKey.toUpperCase();
    const address = rippleKeypairs.deriveAddress(pubKey);
    return { address, privKey, pubKey };
  }
}
