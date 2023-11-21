import Messages from "../../controllers/messages";
import { table } from "table";

const bitcoin = require("bitcoinjs-lib");
const bip65 = require("bip65");

export default class Cltv {
  public initialize(back: any) {
    const userPublic = Messages.getString("Input user 1 public key: ");
    const ronnyPublic = Messages.getString("Input user 2 public key: ");
    const lockTime = Messages.getString("Input lock time: ");
    const encodeLockTime = bip65.encode({ utc: Number(lockTime) });
    const network: any = bitcoin.networks.bitcoin;

    network.public = 0x019da462;
    network.private = 0x019d9cfe;
    network.pubKeyHash = 0x31;
    network.scriptHash = 0x33;
    network.wif = 0xb1;

    const redeemScript = this.cltvCheckSigOutput(
      userPublic,
      ronnyPublic,
      encodeLockTime
    );
    const p2sh: any = bitcoin.payments.p2sh({
      redeem: { output: redeemScript, network },
      network,
    });
    const data = [
      ["P2SH address", p2sh.address],
      ["redeemScript", redeemScript.toString("hex")],
      ["encodeLockTime", encodeLockTime],
    ];

    Messages.answer(table(data));
    back();
  }

  public cltvCheckSigOutput = (aQ: any, bQ: any, lockTime: any) => {
    return bitcoin.script.compile([
      bitcoin.opcodes.OP_IF,
      bitcoin.script.number.encode(lockTime),
      bitcoin.opcodes.OP_CHECKLOCKTIMEVERIFY,
      bitcoin.opcodes.OP_DROP,

      bitcoin.opcodes.OP_ELSE,
      // bQ.publicKey,
      //@ts-ignore
      new Buffer.from(bQ, "hex"),
      bitcoin.opcodes.OP_CHECKSIGVERIFY,
      bitcoin.opcodes.OP_ENDIF,

      // aQ.publicKey,
      //@ts-ignore
      new Buffer.from(aQ, "hex"),
      bitcoin.opcodes.OP_CHECKSIG,
    ]);
  };
}
