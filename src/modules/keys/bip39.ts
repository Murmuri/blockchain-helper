import Messages from "../../controllers/messages";
const Mnemonic = require("bitcore-mnemonic");

export default class Bip39 {
  public initialize(back: any) {
    this.getPhrase();
    back();
  }

  public getPhrase() {
    const mnemonic = new Mnemonic(Mnemonic.Words.ENGLISH);
    const phrase = mnemonic.phrase;

    Messages.answer(phrase);
  }
}
