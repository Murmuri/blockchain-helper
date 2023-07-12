import IMenu from './interfaces/menu';
import Menu from './controllers/menu';
import Ducatus from './modules/ducatus';
import Ducx from './modules/ducx';
import Keys from './modules/keys';
import Peer from './modules/peer';
import Ethereum from './modules/ethereum';

export default class ProgramInterface extends Menu {
  
  constructor() {
    const menuList: IMenu[] = [ 
      {
        name: 'Ducatus',
        annotation: 'simple operations',
        module: new Ducatus()
      },
      {
        name: 'DucatusX',
        annotation: 'simple operations',
        module: new Ducx()
      },
      {
        name: 'Ethereum',
        annotation: 'simple operations',
        module: new Ethereum()
      },
      {
        name: "HD Keys",
        annotation: "mnemonic and hierarchical deterministic",
        module: new Keys(),
      },
      {
        name: "P2P",
        annotation: "Chck peers",
        module: new Peer(),
      },
    ];
    const menuListTitle: string = 'Hi, this is Blockchain helper, input number: ';
  
    super(menuList, menuListTitle);
  }
}

const programInterface = new ProgramInterface();
programInterface.init();
