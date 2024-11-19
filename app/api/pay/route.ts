import { NextRequest, NextResponse } from "next/server";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { encodeURL, findReference, validateTransfer } from "@solana/pay";
import BigNumber from "bignumber.js";

// CONSTANTS
const myWallet = "81ewRgsX9M8Wpqwc5daBnYFPKprreXcdv1d1i93YH25Q"; // Replace with your wallet address (this is the destination where the payment will be sent)
const recipient = new PublicKey(myWallet);
const amount = new BigNumber(0.0001); // 0.0001 SOL
const label = "DPUMP";
const memo = "DPUMP";
const quicknodeEndpoint =
  "https://warmhearted-maximum-layer.solana-mainnet.quiknode.pro/a4124ca5da0ab18d9c297ba1d29ba5fd28d3b58f"; // Replace with your QuickNode endpoint

async function generateUrl(
  recipient: PublicKey,
  amount: BigNumber,
  reference: PublicKey,
  label: string,
  message: string,
  memo: string
) {
  const url: URL = encodeURL({
    recipient,
    amount,
    reference,
    label,
    message,
    memo,
  });
  return { url };
}

const paymentRequests = new Map<
  string,
  { recipient: PublicKey; amount: BigNumber; memo: string }
>();

export async function POST(request: NextRequest) {
  const newMessage = await request.json();

  try {
    const reference = new Keypair().publicKey;
    const message = `QuickNode Demo - Order ID #0${
      Math.floor(Math.random() * 999999) + 1
    }`;
    const urlData = await generateUrl(
      recipient,
      amount,
      reference,
      label,
      message,
      memo
    );
    const ref = reference.toBase58();
    paymentRequests.set(ref, { recipient, amount, memo });
    const { url } = urlData;
    return NextResponse.json({ url: url.toString(), ref });
  } catch (error) {
    console.error("Error:", error);
  }
}
