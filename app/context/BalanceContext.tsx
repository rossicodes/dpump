// app/context/BalanceContext.tsx

"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface TokenBalance {
  amount: string;
  decimals: number;
  uiAmount: number | null;
  uiAmountString: string;
}

interface BalanceContextType {
  balance: TokenBalance | null;
  setBalance: React.Dispatch<React.SetStateAction<TokenBalance | null>>;
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export const BalanceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [balance, setBalance] = useState<TokenBalance | null>(null);

  return (
    <BalanceContext.Provider value={{ balance, setBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalance = (): BalanceContextType => {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error("useBalance must be used within a BalanceProvider");
  }
  return context;
};
