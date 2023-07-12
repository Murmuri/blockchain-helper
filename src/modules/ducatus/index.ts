import IMenu from '../../interfaces/menu';
import Cltv from './cltv';
import Menu from '../../controllers/menu';

export default class Ducatus extends Menu {
  constructor() {
    const menuList: IMenu[] = [
      {
        name: 'CLTV',
        annotation: 'Get redeem script and address',
        module: new Cltv(),
      },
    ];
    const menuListTitle: string = 'Ducatus module, input number: ';
    
    super(menuList, menuListTitle);
  }

}
