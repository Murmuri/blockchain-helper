import Ducatus from "./modules/ducatus";
import Ducx from "./modules/ducx";
import Keys from "./modules/keys";
import Peer from "./modules/peer";
import Ethereum from "./modules/ethereum";
import select from "@inquirer/select";
import Messages from "./controllers/messages";

enum Menu {
  DUC = "duc",
  DUCX = "ducx",
  ETH = "eth",
  KEYS = "keys",
  P2P = "p2p",
}

export default class ProgramInterface {
  async initialize() {
    const menuList = {
      duc: new Ducatus(),
      ducx: new Ducx(),
      eth: new Ethereum(),
      keys: new Keys(),
      p2p: new Peer(),
    };

    const answer: Menu = await select({
      message: "Select item: ",
      choices: [
        {
          name: "Ducatus",
          value: Menu.DUC,
          description: "* Ducatus blockchain simple operations.",
        },
        {
          name: "DucatusX",
          value: Menu.DUCX,
          description: "* DucatusX blockchain simple operations.",
        },
        {
          name: "Ethereum",
          value: Menu.ETH,
          description: "* Ethereum blockchain simple operations.",
        },
        {
          name: "HD Keys",
          value: Menu.KEYS,
          description: "* Mnemonic and hierarchical deterministic.",
        },
        {
          name: "P2P",
          value: Menu.P2P,
          description: "* Check peers.",
        },
      ],
    });

    menuList[answer].initialize(() => this.initialize());
  }
}

Messages.answer(`

██████╗░██╗░░░░░░█████╗░░█████╗░██╗░░██╗░█████╗░██╗░░██╗░█████╗░██╗███╗░░██╗
██╔══██╗██║░░░░░██╔══██╗██╔══██╗██║░██╔╝██╔══██╗██║░░██║██╔══██╗██║████╗░██║
██████╦╝██║░░░░░██║░░██║██║░░╚═╝█████═╝░██║░░╚═╝███████║███████║██║██╔██╗██║
██╔══██╗██║░░░░░██║░░██║██║░░██╗██╔═██╗░██║░░██╗██╔══██║██╔══██║██║██║╚████║
██████╦╝███████╗╚█████╔╝╚█████╔╝██║░╚██╗╚█████╔╝██║░░██║██║░░██║██║██║░╚███║
╚═════╝░╚══════╝░╚════╝░░╚════╝░╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝╚═╝░░╚═╝╚═╝╚═╝░░╚══╝

██╗░░██╗███████╗██╗░░░░░██████╗░███████╗██████╗░
██║░░██║██╔════╝██║░░░░░██╔══██╗██╔════╝██╔══██╗
███████║█████╗░░██║░░░░░██████╔╝█████╗░░██████╔╝
██╔══██║██╔══╝░░██║░░░░░██╔═══╝░██╔══╝░░██╔══██╗
██║░░██║███████╗███████╗██║░░░░░███████╗██║░░██║
╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░░░░╚══════╝╚═╝░░╚═╝
`);

const programInterface = new ProgramInterface();
programInterface.initialize();
