import IMenu from '../../interfaces/menu';
import Menu from '../../controllers/menu';
import Account from "./account";
import Balance from "./balance";
import Send from "./send";
import Token from "./token";

export default class Ducx extends Menu {
  constructor() {
    const menuList: IMenu[] = [
      {
        name: "Create account.",
        annotation: "Create DUCX account",
        module: new Account(),
      },
      {
        name: "Get balance",
        annotation: "Get DUCX balance",
        module: new Balance(),
      },
      {
        name: "Send ducx",
        annotation: "Send DUCX coins",
        module: new Send(),
      },
      {
        name: "Get token balance",
        annotation: "Get DUCX token balance",
        module: new Token(),
      },
    ];
    const menuListTitle: string = 'Ducx module, input number: ';

    super(menuList, menuListTitle);
  }
}
