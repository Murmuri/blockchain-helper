import rs from 'readline-sync';
import IRenderMenuList from '../../interfaces/render-menu-list';
import IRenderList from '../../interfaces/render-list';

export default abstract class Messages {
  public static networks = ['mainnet', 'livenet', 'testnet'];

  public static chains = [
    'BTC',
    'BCH',
    'DUC',
    'DUCX',
    'DOGE',
    'LTC',
    'ETH',
    'XRP',
  ];

  public static timer: any;

  public static setDefaultColor(): void {
    console.log('\x1b[0m');
  }

  public static setTitleColor(): void {
    console.log('\x1b[1m');
    console.log('\x1b[34m');
  }

  public static setListColor(): void {
    console.log('\x1b[35m');
  }

  public static setQuestionColor(): void {
    console.log('\x1b[1m');
    console.log('\x1b[33m');
  }

  public static setAnswerColor(): void {
    console.log('\x1b[1m');
    console.log('\x1b[32m');
  }

  public static setErrorColor(): void {
    console.log('\x1b[1m');
    console.log('\x1b[31m');
  }

  public static renderMenuList({ title, list }: IRenderMenuList): string {
    this.setTitleColor();
    console.log(title);

    this.setListColor();
    list.forEach((unit: any, index: number) => {
      const string = `${index + 1}. ${unit.name} (${unit.annotation})`;
      console.log(string);
    });

    this.setQuestionColor();
    const answer = rs.question('Specify but provide a number: ');

    return answer;
  }

  public static renderList({ title, list }: IRenderList): string {
    this.setTitleColor();
    console.log(title);

    this.setListColor();
    list.forEach((unit: any, index: number) => {
      const string = `${index + 1}. ${unit.name}`;
      console.log(string);
    });

    this.setQuestionColor();
    const answer = rs.question('Specify but provide a number: ');

    return answer;
  }

  public static getPath() {
    this.setQuestionColor();
    return rs.question('Input path: ');
  }

  public static getChain(): string {
    this.setTitleColor();
    console.log('Choice chain');

    this.setListColor();
    this.chains.forEach((chain, index) => {
      const string = `${index + 1}. ${chain}`;
      console.log(string);
    });

    this.setQuestionColor();
    const indexChain = rs.question('Input number chain: ');
    const index = Number(indexChain);

    return this.chains[Number(index) - 1];
  }

  public static choiceChain(
    modules: { title: string; peer?: any; web3?: boolean }[]
  ) {
    this.setTitleColor();
    console.log('Choice blockchain: ');

    this.setListColor();
    modules.forEach((module, index) => {
      const string = `${index + 1}. ${module.title}`;
      console.log(string);
    });

    this.setQuestionColor();
    return rs.question('Specify but provide a number: ');
  }

  public static getNetwork(): string {
    this.setTitleColor();
    console.log('Choice network: ');

    this.setListColor();
    this.networks.forEach((network, index) => {
      const string = `${index + 1}. ${network}`;
      console.log(string);
    });

    this.setQuestionColor();
    const indexNetwork = rs.question('Input number network: ');
    const index = Number(indexNetwork);

    return this.networks[Number(index) - 1];
  }

  public static answer(text: string) {
    this.setAnswerColor();
    console.log(text);
  }

  public static error(text: string) {
    this.setErrorColor();
    console.log(text);
  }

  public static accent(text: string) {
    this.setTitleColor();
    console.log(text);
  }

  public static getString(text: string) {
    this.setQuestionColor();
    return rs.question(text);
  }
}
