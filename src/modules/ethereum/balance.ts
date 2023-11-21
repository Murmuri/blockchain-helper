import Messages from "../../controllers/messages";
import Web3 from "web3";
import { table } from "table";

export default class Balance {
  private provider: any;
  private web3: any;

  public initialize(back: any) {
    const infura = Messages.getString("Input infura api key: ");
    this.provider = new Web3.providers.HttpProvider(
      `https://ropsten.infura.io/v3/${infura}`
    );
    this.web3 = new Web3(this.provider);

    this.getBalance();
    back();
  }

  public async getBalance() {
    const address = Messages.getString("Input address: ");

    const balance = await this.web3.eth.getBalance(address);
    const ethBalance = Number(balance) / 1000000000000000000;

    const data = [["Balance", `${balance} wei(${ethBalance} ETH)`]];

    Messages.answer(table(data));
  }
}
