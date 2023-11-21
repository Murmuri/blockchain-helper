import Messages from "../../controllers/messages";
import Web3 from "web3";
import { table } from "table";

export default class Account {
  private provider: any;
  private web3: any;

  public initialize(back: any) {
    const infura = Messages.getString("Input infura api key: ");
    this.provider = new Web3.providers.HttpProvider(
      `https://ropsten.infura.io/v3/${infura}`
    );
    this.web3 = new Web3(this.provider);

    this.createAccount();
    back();
  }

  public createAccount() {
    const account = this.web3.eth.accounts.create();
    const { address, privateKey } = account;

    const data = [
      ["PrivateKey", privateKey],
      ["Address", address],
    ];

    Messages.answer(table(data));
  }
}
