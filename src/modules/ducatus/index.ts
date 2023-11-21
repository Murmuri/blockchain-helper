import Cltv from "./cltv";
import select from "@inquirer/select";

enum Menu {
  CLTV = "cltv",
  BACK = "back",
}

export default class Ducatus {
  

  async initialize(back: any) {
    const menuList = {
      cltv: new Cltv(),
    };

    const answer: Menu = await select({
      message: "Ducatus module, select item: ",
      choices: [
        {
          name: "CLTV",
          value: Menu.CLTV,
          description: "* Get redeem script and address.",
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
