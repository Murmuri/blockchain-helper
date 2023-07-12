import Messages from "../../controllers/messages";
import Web3 from "web3";

export default class Send {
  private provider: any;
  private web3: any;

  public init() {
    this.provider = new Web3.providers.HttpProvider(
      `http://212.24.108.89:8546`
    );
    this.web3 = new Web3(this.provider);

    this.sendEther();
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
      Messages.answer('Sended tx: ');
      Messages.answer(sendedTx);
    } catch (e:any) {
      Messages.error(e);
    }
  }
}
