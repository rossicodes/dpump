// app/components/ConditionalAssistant.tsx

"use client";

import React, { useState } from "react";
import OpenAIAssistant from "@/app/ui/openai-assistant";
import { useBalance } from "../context/BalanceContext"; // Adjust the path as needed
import { formatNumber } from "../../utils/fotmatNumber"; // Import the utility function
import Typewriter from "./TypeWriter"; // Import the Typewriter component
import Link from "next/link";

const ConditionalAssistant: React.FC = () => {
  const { balance } = useBalance(); // Access balance from context

  console.log(balance);

  // Define the minimum balance required to render OpenAIAssistant
  const MIN_BALANCE = 5000000; // Adjust based on your requirements

  // Parse the uiAmountString to a number for comparison
  const balanceNumber = balance ? parseFloat(balance.uiAmountString) : 0;

  // Prepare the dynamic value
  const formattedBalance = balance ? formatNumber(balanceNumber) : "0";

  // Prepare the paragraphs
  const paragraph1 =
    "Listen, I do very, very well. I'm very successful. I'm talking to some of the greatest, most successful guys in the whole world, okay?";

  // For paragraph2, split into parts: static text, dynamic styled span, static text
  const paragraph2Parts: Array<string | React.ReactNode> = [
    "You need much more $DPUMP than ",
    <span
      key="balance"
      className="bg-gradient-to-r from-purple-600 to-pink-600 inline-block text-transparent bg-clip-text"
    >
      {formattedBalance}
    </span>,
    " if we are going to chat mano a mano.",
  ];

  // State to control visibility of paragraphs
  const [showParagraph1, setShowParagraph1] = useState(true);
  const [showParagraph2, setShowParagraph2] = useState(false);
  const [fadeOut, setFadeOut] = useState(false); // State for fade-out effect

  return (
    <div className="flex flex-col items-center">
      {balanceNumber >= MIN_BALANCE ? (
        <OpenAIAssistant
          assistantId="asst_u3d5mijYcD7ctIQ5bNGtiqXn"
          greeting="Ask me anything about Memecoins. Nobody knows Memecoins better than me, nobody."
        />
      ) : (
        <div className="w-full max-w-2xl">
          {/* Fixed Height Container to Prevent Layout Shift */}
          <div className="relative h-24">
            {" "}
            {/* Adjust 'h-48' as needed */}
            {/* First Paragraph with Typing Animation and Fade-Out */}
            {showParagraph1 && (
              <Typewriter
                parts={[paragraph1]}
                className={`font-black text-xl mb-4 transition-opacity duration-1000 ${
                  fadeOut ? "opacity-0" : "opacity-100"
                }`}
                speed={50} // Adjust speed as needed (milliseconds per character)
                onComplete={() => {
                  // Trigger fade-out
                  setFadeOut(true);
                  // After fade-out duration, hide Paragraph 1 and show Paragraph 2
                  setTimeout(() => {
                    setShowParagraph1(false);
                    setShowParagraph2(true);
                  }, 1000); // Duration should match the CSS transition duration (1000ms)
                }}
              />
            )}
            {/* Second Paragraph with Typing Animation */}
            {showParagraph2 && (
              <Typewriter
                parts={paragraph2Parts}
                className="font-black text-xl mb-4"
                speed={50}
              />
            )}
          </div>

          <div className="font-black text-xl my-4 flex flex-col justify-center items-center">
            <Link href="https://pump.fun/coin/BPU2J8RXPaQzp75mVrbawZEWi5p9PAo2sMafBmEGpump">
              $DPUMP Token Address:
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 inline-block text-transparent bg-clip-text">
                BPU2J8RXPaQzp75mVrbawZEWi5p9PAo2sMafBmEGpump
              </span>{" "}
              Buy now on Pump.fun!
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConditionalAssistant;
