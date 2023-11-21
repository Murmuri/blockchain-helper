import Messages from "../../controllers/messages";
import Chains from "../../controllers/chains";
import Networks from "../../controllers/networks";
import { Deriver } from "../../libs/cwc";
import { table } from "table";
import select from "@inquirer/select";
const Mnemonic = require("bitcore-mnemonic");

export default class Address {
  public initialize(back: any) {
    this.generateKeys(back);
    back();
  }

  public async generateKeys(back: any) {
    const phrase = Messages.getString("Input phrase(optional): ");
    const chain = this.getChainModule(back);
    const network: string = this.getNetwork(back);
    const mnemonic = new Mnemonic(phrase);
    const hdPrivKey = mnemonic.toHDPrivateKey();
    const xPriv = hdPrivKey.xprivkey;
    const path = Deriver.pathFor(chain.name, network);
    const deriveHdPrivKey = mnemonic.toHDPrivateKey().derive(path);
    const xPrivDerive = deriveHdPrivKey.xprivkey;
    const xPubDerive = deriveHdPrivKey.xpubkey.toString();

    const rootData = [
      ["Mnemonic", mnemonic],
      ["BIP32 Root Key extended private key", xPriv],
      ["Derivation path", path],
      ["Extended private key", xPrivDerive],
      ["Extended public key", xPubDerive],
      ["Derivation path", path],
    ];
    const derivedData = [];

    derivedData.push(["Address path", "Address", "Private key", "Public key"]);

    for (let i = 0; i < 10; i++) {
      const keys = Deriver.derivePrivateKey(
        chain.name,
        network,
        xPrivDerive,
        i,
        false
      );
      const { address, privKey, pubKey } = keys;
      derivedData.push([path + "/" + i, address, privKey, pubKey]);
    }
    Messages.answer(table(rootData));
    Messages.answer(table(derivedData));
  }

  public getChainModule(back: any): any {
    const chainMenuListNumber = Messages.renderMenuList({
      title: 'Choice chain: ',
      list: Chains,
    });
    const chainMenuListIndex = Number(chainMenuListNumber) - 1;

    if (chainMenuListIndex < 0 && chainMenuListIndex > Chains.length - 1) {
      this.initialize(back);
      return 0;
    }

    return Chains[chainMenuListIndex];
  }

  public getNetwork(back: any): string {
    const networkMenuListNumber: string = Messages.renderList({
      title: 'Choice network: ',
      list: Networks,
    });
    const chainMenuListIndex = Number(networkMenuListNumber) - 1;

    if (chainMenuListIndex < 0 && chainMenuListIndex > Networks.length - 1) {
      this.initialize(back);
      return '';
    }

    return Networks[chainMenuListIndex].value;
  }
}
