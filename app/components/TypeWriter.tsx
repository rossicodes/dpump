// app/components/Typewriter.tsx

"use client"; // Ensures the component is rendered only on the client side

import React, { useState, useEffect } from "react";

interface TypewriterProps {
  parts: Array<string | React.ReactNode>;
  speed?: number; // Milliseconds per character
  className?: string;
  onComplete?: () => void; // Callback when typing is complete
}

const Typewriter: React.FC<TypewriterProps> = ({
  parts,
  speed = 50,
  className,
  onComplete,
}) => {
  const [displayedParts, setDisplayedParts] = useState<
    Array<string | React.ReactNode>
  >([]);
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    if (currentPartIndex >= parts.length) {
      if (onComplete) onComplete();
      return;
    }

    const currentPart = parts[currentPartIndex];

    if (typeof currentPart === "string") {
      // Type out the string character by character
      let charIndex = 0;
      const interval = setInterval(() => {
        charIndex++;
        setCurrentText(currentPart.slice(0, charIndex));
        if (charIndex === currentPart.length) {
          clearInterval(interval);
          setDisplayedParts((prev) => [...prev, currentPart]);
          setCurrentText("");
          setCurrentPartIndex((prev) => prev + 1);
        }
      }, speed);

      return () => clearInterval(interval);
    } else {
      // If it's a React node, render it instantly
      setDisplayedParts((prev) => [...prev, currentPart]);
      setCurrentPartIndex((prev) => prev + 1);
    }
  }, [currentPartIndex, parts, speed, onComplete]);

  return (
    <p className={`${className} overflow-hidden`}>
      {displayedParts.map((part, index) => (
        <React.Fragment key={index}>{part}</React.Fragment>
      ))}
      {typeof parts[currentPartIndex] === "string" && (
        <span>{currentText}</span>
      )}
      {/* Blinking Cursor */}
      <span className="inline-block animate-blink">|</span>
      <style jsx>{`
        @keyframes blink {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </p>
  );
};

export default Typewriter;
