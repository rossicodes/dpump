// app/components/ConditionalAssistant.tsx

"use client";

import React from "react";
import OpenAIAssistant from "@/app/ui/openai-assistant";
import { useBalance } from "../context/BalanceContext"; // Adjust the path as needed
import { formatNumber } from "../../utils/fotmatNumber"; // Import the utility function

const ConditionalAssistant: React.FC = () => {
  const { balance } = useBalance(); // Access balance from context

  console.log(balance);

  // Define the minimum balance required to render OpenAIAssistant
  const MIN_BALANCE = 0.0001; // Adjust based on your requirements

  // Parse the uiAmountString to a number for comparison
  const balanceNumber = balance ? parseFloat(balance.uiAmountString) : 0;

  return (
    <div>
      {balanceNumber >= MIN_BALANCE ? (
        <>
          <OpenAIAssistant
            assistantId="asst_u3d5mijYcD7ctIQ5bNGtiqXn"
            greeting="Ask me anything about Memecoins. Nobody knows Memecoins better than me, nobody."
          />
        </>
      ) : (
        <p className="font-black text-xl">
          Listen, I do very, very well. I'm very successful. I'm talking to some
          of the greatest, most successful people in the whole world, okay? You
          need much more $DPUMP than{" "}
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 inline-block text-transparent bg-clip-text">
            {balance ? formatNumber(parseFloat(balance.uiAmountString)) : 0}
          </span>{" "}
          if we are going to talk.
        </p>
      )}
    </div>
  );
};

export default ConditionalAssistant;
