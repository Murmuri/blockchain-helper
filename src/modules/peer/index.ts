import IMenu from '../../interfaces/menu';
import Menu from '../../controllers/menu';
import Check from "./check";


export default class Ducx extends Menu {
  constructor() {
    const menuList: IMenu[] = [
      {
        name: "Peer",
        annotation: "Check peer connection",
        module: new Check(),
      }
    ];
    const menuListTitle: string = 'Peer module, input number: ';

    super(menuList, menuListTitle);
  }
}
