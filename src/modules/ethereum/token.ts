import Messages from "../../controllers/messages";
import Web3 from "web3";

export default class Token {
  public init() {
    this.getBalanceForAddress();
  }

  public async getBalanceForAddress() {
    const infura = Messages.getString("Input infura api key: ");
    const provider = new Web3.providers.HttpProvider(
      `https://ropsten.infura.io/v3/${infura}`
    );
    const web3 = new Web3(provider);
    const walletAddress = Messages.getString("Wallet address: ");
    const tokenAddress = Messages.getString("Token addres: ");

    const minABI = [
      {
        constant: true,
        inputs: [{ name: "_owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "balance", type: "uint256" }],
        type: "function",
      },
    ];
    // @ts-ignore
    const contract = new web3.eth.Contract(minABI, tokenAddress);

    async function getBalance() {
      const result = await contract.methods.balanceOf(walletAddress).call();
      const format = web3.utils.fromWei(result);

      Messages.answer("Balance: " + format);
    }

    getBalance();
  }
}
