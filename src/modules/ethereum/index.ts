import Account from "./account";
import Balance from "./balance";
import Send from "./send";
import Token from "./token";
import select from "@inquirer/select";

enum Menu {
  ACCOUNT = "account",
  BALANCE = "balance",
  SEND = "send",
  TOKEN_BALANCE = "token_balance",
  BACK = "back",
}

export default class Ethereum {
  async initialize(back: any) {
    const menuList = {
      account: new Account(),
      balance: new Balance(),
      send: new Send(),
      token_balance: new Token(),
    };

    const answer: Menu = await select({
      message: "Select item: ",
      choices: [
        {
          name: "Create account",
          value: Menu.ACCOUNT,
          description: "* Create ETH account.",
        },
        {
          name: "Get balance",
          value: Menu.BALANCE,
          description: "* Get ETH balance.",
        },
        {
          name: "Send DUCX",
          value: Menu.SEND,
          description: "* Send ETH coins.",
        },
        {
          name: "Get token balance",
          value: Menu.TOKEN_BALANCE,
          description: "* Get ETH token balance.",
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
