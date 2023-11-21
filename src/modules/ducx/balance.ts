import Messages from "../../controllers/messages";
import Web3 from "web3";
import { table } from "table";

export default class Balance {
  private provider: any;
  private web3: any;

  public initialize(back: any) {
    this.provider = new Web3.providers.WebsocketProvider(
      `wss://ducx-mainnet-api1-ws.rocknblock.io`
    );
    this.web3 = new Web3(this.provider);

    this.getBalance();
    back();
  }

  public async getBalance() {
    const address = Messages.getString("Input address: ");

    const balance = await this.web3.eth.getBalance(address);
    const ducxBalance = Number(balance) / 1000000000000000000;
    const data = [["Balance", `${balance} wei(${ducxBalance} DUCX)`]];

    Messages.answer(table(data));
  }
}
