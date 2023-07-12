import Messages from '../../controllers/messages';
const Mnemonic = require('bitcore-mnemonic');

export default class Bip39 {
  public  init() {
    this.getPhrase();
  }

  public  getPhrase() {
    const mnemonic = new Mnemonic(Mnemonic.Words.ENGLISH);
    const phrase = mnemonic.phrase;

    Messages.answer(phrase);
  }
}
