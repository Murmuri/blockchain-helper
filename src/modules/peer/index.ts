import select from "@inquirer/select";
import Check from "./check";

enum Menu {
  CONNECTION = "connection",
  BACK = "back",
}

export default class Peer {
  async initialize(back: any) {
    const menuList = {
      connection: new Check(),
    };

    const answer: Menu = await select({
      message: "Select item: ",
      choices: [
        {
          name: "Connection",
          value: Menu.CONNECTION,
          description: "* Check peer connection.",
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
