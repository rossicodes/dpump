// app/components/navbar/NavBar.tsx

"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useBalance } from "../context/BalanceContext";
import { formatNumber } from "../../utils/fotmatNumber"; // Import the utility function

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

interface TokenBalance {
  amount: string;
  decimals: number;
  uiAmount: number | null;
  uiAmountString: string;
}

const TOKEN_MINT_ADDRESS = "8pLeq83AGXBJzDajxQykXu3bGkWqJqcn6cAavZhW8exg"; // Replace with your token's mint address

const NavBar = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const { balance, setBalance } = useBalance();

  const getTokenBalance = async () => {
    if (!publicKey) {
      setBalance(null);
      return;
    }

    try {
      const tokenMint = new PublicKey(TOKEN_MINT_ADDRESS);

      // Fetch token accounts for the owner and the specified mint
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        publicKey,
        { mint: tokenMint }
      );

      if (tokenAccounts.value.length === 0) {
        // No token accounts found for this mint and owner
        setBalance({
          amount: "0",
          decimals: 0,
          uiAmount: 0,
          uiAmountString: "0",
        });
        return;
      }

      // Assuming the first token account is the one to use
      const tokenAccountInfo = tokenAccounts.value[0].account.data.parsed.info;

      const tokenBalance = tokenAccountInfo.tokenAmount;

      const transformedBalance: TokenBalance = {
        amount: tokenBalance.amount,
        decimals: tokenBalance.decimals,
        uiAmount: tokenBalance.uiAmount,
        uiAmountString: tokenBalance.uiAmountString || "0",
      };

      setBalance(transformedBalance);
    } catch (error) {
      console.error("Error fetching token balance:", error);
      setBalance(null);
    }
  };

  useEffect(() => {
    getTokenBalance();
    const interval = setInterval(getTokenBalance, 10000); // Poll every 10 seconds
    return () => clearInterval(interval);
  }, [publicKey, connection]);

  return (
    <div className="flex justify-between p-4">
      <div className="flex items-center space-x-4">
        <h3 className="font-black text-lg">
          $DPUMP:{" "}
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 inline-block text-transparent bg-clip-text">
            {balance ? formatNumber(parseFloat(balance.uiAmountString)) : 0}{" "}
          </span>
        </h3>
      </div>
      <div>
        <WalletMultiButtonDynamic>
          {publicKey
            ? `${publicKey.toBase58().substring(0, 7)}...`
            : "Connect Wallet"}
        </WalletMultiButtonDynamic>
      </div>
    </div>
  );
};

export default NavBar;
