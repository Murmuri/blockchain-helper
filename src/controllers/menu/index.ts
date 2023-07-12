import Messages from '../../controllers/messages';
import IMenu from '../../interfaces/menu';

export default class Menu {
  public menuList: IMenu[];
  public menuListTitle: string;

  constructor(menu: IMenu[], menuListTitle: string ) {
    this.menuList = menu;
    this.menuListTitle = menuListTitle;
  }

  public async init() {
    const menuListNumber: string = Messages.renderMenuList({
      title: this.menuListTitle,
      list: this.menuList,
    });
    const menuListIndex = Number(menuListNumber) - 1;

    if (
      menuListIndex < 0 &&
      menuListIndex > this.menuList.length - 1
    ) {
      this.init();
      return 0;
    }

    const module = this.menuList[menuListIndex].module;

    module.init();
  }
}