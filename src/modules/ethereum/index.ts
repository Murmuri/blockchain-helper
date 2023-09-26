import IMenu from '../../interfaces/menu';
import Menu from '../../controllers/menu';
import Account from "./account";
import Balance from "./balance";
import Send from "./send";
import Token from "./token";

export default class Ethereum extends Menu {
  constructor() {
    const menuList: IMenu[] = [
      {
        name: "Create account.",
        annotation: "",
        module: Account,
      },
      {
        name: "Get balance",
        annotation: "",
        module: Balance,
      },
      {
        name: "Send etherium",
        annotation: "",
        module: Send,
      },
      {
        name: "Get token balance",
        annotation: "",
        module: Token,
      },
    ];
    const menuListTitle: string = 'Ethereum module, input number: ';

    super(menuList, menuListTitle);
  }
}
