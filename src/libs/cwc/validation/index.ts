import { BchValidation } from "./bch";
import { BtcValidation } from "./btc";
import { DogeValidation } from "./doge";
import { DucValidation } from "./duc";
import { DucxValidation } from "./ducx";
import { EthValidation } from "./eth";
import { LtcValidation } from "./ltc";
import { XrpValidation } from "./xrp";

export interface IValidation {
  validateAddress(network: string, address: string): boolean;
  validateUri(addressUri: string): boolean;
}

const validation: { [chain: string]: IValidation } = {
  BTC: new BtcValidation(),
  BCH: new BchValidation(),
  ETH: new EthValidation(),
  XRP: new XrpValidation(),
  DOGE: new DogeValidation(),
  LTC: new LtcValidation(),
  DUC: new DucValidation(),
  DUCX: new DucxValidation(),
};

export class ValidationProxy {
  get(chain: string) {
    const normalizedChain = chain.toUpperCase();
    return validation[normalizedChain];
  }

  validateAddress(chain: string, network: string, address: string) {
    return this.get(chain).validateAddress(network, address);
  }

  validateUri(chain: string, addressUri: string) {
    return this.get(chain).validateUri(addressUri);
  }
}

export default new ValidationProxy();
