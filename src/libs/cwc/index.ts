const DucatusLib = require("@ducatus/bitcore-lib");
const BitcoreLib = require("bitcore-lib");
const BitcoreLibCash = require("bitcore-lib-cash");
const BitcoreLibDoge = require("bitcore-lib-doge");
const BitcoreLibLtc = require("bitcore-lib-ltc");
import Web3 from "web3";
import { Constants } from "./constants";
import Deriver from "./derivation";
import Transactions from "./transactions";
import Validation from "./validation";
export {
  BitcoreLib,
  BitcoreLibCash,
  BitcoreLibDoge,
  BitcoreLibLtc,
  DucatusLib,
  Deriver,
  Transactions,
  Validation,
  Web3,
  Constants,
};
