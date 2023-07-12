import { BchDeriver } from "./bch";
import { BtcDeriver } from "./btc";
import { DogeDeriver } from "./doge";
import { DucDeriver } from "./duc";
import { DucxDeriver } from "./ducx";
import { EthDeriver } from "./eth";
import { LtcDeriver } from "./ltc";
import { Paths } from "./paths";
import { XrpDeriver } from "./xrp";

export interface Key {
  address: string;
  privKey?: string;
  pubKey?: string;
}

export interface IDeriver {
  deriveAddress(
    network: string,
    xPub: string,
    addressIndex: number,
    isChange: boolean
  ): string;

  derivePrivateKey(
    network: string,
    xPriv: string,
    addressIndex: number,
    isChange: boolean
  ): Key;
}

const derivers: { [chain: string]: IDeriver } = {
  BTC: new BtcDeriver(),
  BCH: new BchDeriver(),
  ETH: new EthDeriver(),
  XRP: new XrpDeriver(),
  DOGE: new DogeDeriver(),
  LTC: new LtcDeriver(),
  DUC: new DucDeriver(),
  DUCX: new DucxDeriver(),
};

export class DeriverProxy {
  get(chain: string | number) {
    return derivers[chain];
  }

  deriveAddress(
    chain: any,
    network: string,
    xpubKey: string,
    addressIndex: number,
    isChange: boolean
  ) {
    return this.get(chain).deriveAddress(
      network,
      xpubKey,
      addressIndex,
      isChange
    );
  }

  derivePrivateKey(
    chain: any,
    network: string,
    privKey: string,
    addressIndex: number,
    isChange: boolean
  ) {
    return this.get(chain).derivePrivateKey(
      network,
      privKey,
      addressIndex,
      isChange
    );
  }

  pathFor(chain: string, network: string | number, account = 0) {
    const normalizedChain = chain.toUpperCase();
    const accountStr = `${account}'`;
    //@ts-ignore
    const chainConfig = Paths[normalizedChain];
    if (chainConfig && chainConfig[network]) {
      return chainConfig[network] + accountStr;
    } else {
      return Paths.default.testnet + accountStr;
    }
  }
}

export default new DeriverProxy();
