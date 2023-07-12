import Messages from "../../controllers/messages";
import Chains from '../../controllers/chains';
import Networks from '../../controllers/networks';
import Web3 from "web3";

export default class Check {
  public init() {
    this.checkPeer();
  }

  public async checkPeer() {
    const chain = this.getChainModule();
    const network: string = this.getNetwork();
    const host = Messages.getString('Input host: ');
    const port = Messages.getString('Input port: ');
    const {evm, peer} = chain;

    await this.check({
        host,
        port,
        network,
        evm,
        peer
    });
  }

  public async check(option: any) {
    const { host, port, network, evm, peer } = option;
    const peerOption: any = {};

    if (host) {
      peerOption.host = host;
    }

    if (port) {
      peerOption.port = port;
    }

    if (network) {
      peerOption.network = network;
    }

    if (evm) {
      const web3: Web3 = new Web3(
        new Web3.providers.WebsocketProvider(`ws://${host}:${port}`)
      );

      web3.eth.net
        .isListening()
        .then(() => {
          Messages.answer("Connect");
        })
        .catch(() => {
          Messages.error("Error");
        });
    } else {
      const chainPeer = new peer(peerOption);

      chainPeer.on("ready", function () {
        Messages.answer(
          `Ready: ${chainPeer.version}, ${chainPeer.subversion}, ${chainPeer.bestHeight}`
        );
      });
      chainPeer.on("connect", function () {
        Messages.answer("Connect");
      });
      chainPeer.on("error", function () {
        Messages.error("Error");
      });
      chainPeer.on("disconnect", function () {
        Messages.error("connection closed");
      });

      chainPeer.connect();
    }
  }

  public  getChainModule(): any {
    const chainMenuListNumber = Messages.renderMenuList({
      title: 'Choice chain: ',
      list: Chains,
    });
    const chainMenuListIndex = Number(chainMenuListNumber) - 1;

    if (chainMenuListIndex < 0 && chainMenuListIndex > Chains.length - 1) {
      this.init();
      return 0;
    }

    return Chains[chainMenuListIndex];
  }

  public  getNetwork(): string {
    const networkMenuListNumber: string = Messages.renderList({
      title: 'Choice network: ',
      list: Networks,
    });
    const chainMenuListIndex = Number(networkMenuListNumber) - 1;

    if (chainMenuListIndex < 0 && chainMenuListIndex > Networks.length - 1) {
      this.init();
      return '';
    }

    return Networks[chainMenuListIndex].value;
  }
}
