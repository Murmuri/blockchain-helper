import {
  BitcoreLib,
  BitcoreLibCash,
  BitcoreLibDoge,
  BitcoreLibLtc,
  DucatusLib,
} from '../../libs/cwc';
import IMenu from '../../interfaces/menu';
const Btc = require("bitcore-p2p");
const Cash = require("bitcore-p2p-cash");
const Doge = require("bitcore-p2p-doge");
const Ducatus = require("@ducatus/bitcore-p2p");

const chains: IMenu[] = [
  { annotation: 'Bitcoin', name: 'BTC', module: BitcoreLib, peer: Btc.peer },
  { annotation: 'Bitcoin Cash', name: 'BCH', module: BitcoreLibCash, peer: Cash.peer },
  { annotation: 'Ducatus', name: 'DUC', module: DucatusLib, peer: Ducatus.peer },
  { annotation: 'DucatusX', name: 'DUCX', module: BitcoreLib, evm: true },
  { annotation: 'Doge coin', name: 'DOGE', module: BitcoreLibDoge, peer: Doge.peer },
  { annotation: 'Lite coin', name: 'LTC', module: BitcoreLibLtc, peer: Btc.peer },
  { annotation: 'Ethereum', name: 'ETH', module: BitcoreLib, evm: true },
  { annotation: 'Ripple', name: 'XRP', module: BitcoreLib, evm: true },
];

export default chains;
