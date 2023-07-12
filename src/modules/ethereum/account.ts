import Messages from "../../controllers/messages";
import Web3 from "web3";

export default class Account {
  private provider: any;
  private web3: any;

  public init() {
    const infura = Messages.getString("Input infura api key: ");
    this.provider = new Web3.providers.HttpProvider(
      `https://ropsten.infura.io/v3/${infura}`
    );
    this.web3 = new Web3(this.provider);

    this.createAccount();
  }

  public createAccount() {
    const account = this.web3.eth.accounts.create();
    const { address, privateKey } = account;

    Messages.answer("PrivateKey: " + privateKey);
    Messages.answer("Address: " + address);
  }
}
