"use client";

import {
  WalletProvider,
  ConnectionProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  AlphaWalletAdapter,
  LedgerWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { FC, useMemo } from "react";

import "@solana/wallet-adapter-react-ui/styles.css";
import { BalanceProvider } from "../context/BalanceContext";

type Props = {
  children?: React.ReactNode;
};

export const Wallet: FC<Props> = ({ children }) => {
  //input your RPC as your endpoint value
  const endpoint =
    "https://warmhearted-maximum-layer.solana-mainnet.quiknode.pro/a4124ca5da0ab18d9c297ba1d29ba5fd28d3b58f";

  const wallets = useMemo(
    () => [
      new SolflareWalletAdapter(),
      new AlphaWalletAdapter(),
      new LedgerWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <BalanceProvider>
        <WalletProvider wallets={wallets} autoConnect={true}>
          <WalletModalProvider>{children}</WalletModalProvider>
        </WalletProvider>
      </BalanceProvider>
    </ConnectionProvider>
  );
};
