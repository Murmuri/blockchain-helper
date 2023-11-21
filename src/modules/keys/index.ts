import Bip39 from "./bip39";
import GenerateKeys from "./generate-keys";
import select from "@inquirer/select";

enum Menu {
  MNEMONIC = "mnemonic",
  GENERATE = "generate",
  BACK = "back",
}

export default class Keys {
  async initialize(back: any) {
    const menuList = {
      mnemonic: new Bip39(),
      generate: new GenerateKeys(),
    };
    const answer: Menu = await select({
      message: "Select item: ",
      choices: [
        {
          name: "Get mnemonic phrase(BIP-39)",
          value: Menu.MNEMONIC,
          description: "* 12 words in English.",
        },
        {
          name: "Generate keys",
          value: Menu.GENERATE,
          description:
            "* From mnemonic(DucatusWallet WARRING! BTC index = 1025, DUC index = 0, DUCX index = 1060).",
        },
        {
          name: "<<< Back",
          value: Menu.BACK,
        },
      ],
    });

    if (answer === Menu.BACK) {
      back();
      return;
    }

    menuList[answer].initialize(() => this.initialize(back));
  }
}
