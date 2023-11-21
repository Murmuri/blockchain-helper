import Messages from "../../controllers/messages";
import Web3 from "web3";
import { table } from "table";

export default class Send {
  private provider: any;
  private web3: any;

  public initialize(back: any) {
    const infura = Messages.getString("Input infura api key: ");
    this.provider = new Web3.providers.HttpProvider(
      `https://ropsten.infura.io/v3/${infura}`
    );
    this.web3 = new Web3(this.provider);

    this.sendEther();
    back();
  }

  public async sendEther() {
    const from = Messages.getString("From address: ");
    const to = Messages.getString("To address: ");
    const value = Messages.getString("Value: ");
    const gas = Messages.getString("Gas: ");
    const gasPrice = Messages.getString("Gas price: ");
    const privKey = Messages.getString("Private key: ");

    const tx = {
      from,
      to,
      value: Number(value),
      gas: Number(gas),
      gasPrice: Number(gasPrice),
      data: "",
    };

    const sigTx = await this.web3.eth.accounts.signTransaction(tx, privKey);
    const { rawTransaction } = sigTx;

    try {
      const sendedTx = await this.web3.eth.sendSignedTransaction(
        rawTransaction as string
      );
      const data = [["Sended tx", sendedTx]];

      Messages.answer(table(data));
    } catch (e: any) {
      Messages.error(e);
    }
  }
}
