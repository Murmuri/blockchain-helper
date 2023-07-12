import IMenu from '../../interfaces/menu';
import Bip39 from './bip39';
import GenerateKeys from './generate-keys';
import Menu from '../../controllers/menu';

export default class Keys extends Menu {
  constructor() {
    const menuList: IMenu[] = [
      {
        name: 'Get mnemonic phrase(BIP-39)',
        annotation: '12 words in English',
        module: new Bip39(),
      },
      {
        name: 'Generate keys.',
        annotation: 'From mnemonic(DucatusWallet WARRING! BTC index = 1025, DUC index = 0, DUCX index = 1060)',
        module: new GenerateKeys(),
      },
    ];
    const menuListTitle: string = 'HD Keys(input menu number): ';
    super(menuList, menuListTitle);
  }
}
