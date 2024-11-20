// components/CountdownTimer.tsx
"use client"; // Ensures the component is rendered only on the client side

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "../../components/ui/card"; // Adjust based on ShadCN UI's actual component exports
import { formatInTimeZone, fromZonedTime } from "date-fns-tz";
import { addDays, differenceInSeconds } from "date-fns"; // Import from 'date-fns'
import Link from "next/link";

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC = () => {
  const TARGET_TIME_ZONE = "America/New_York"; // EST/EDT based on date
  const TARGET_HOUR = 10; // 10 AM

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date();

    // Format current time in target time zone
    const nowInTargetTZStr = formatInTimeZone(
      now,
      TARGET_TIME_ZONE,
      "yyyy-MM-dd HH:mm:ss"
    );
    const [datePart, timePart] = nowInTargetTZStr.split(" ");
    const [year, month, day] = datePart.split("-").map(Number);
    const [hour, minute, second] = timePart.split(":").map(Number);

    // Create a Date object for 10 AM EST/EDT today
    let targetDate = new Date(year, month - 1, day, TARGET_HOUR, 0, 0);

    // Convert targetDate in EST/EDT to UTC
    let targetDateUTC = fromZonedTime(targetDate, TARGET_TIME_ZONE);

    // If current UTC time is past target UTC time, set target to next day
    if (now > targetDateUTC) {
      targetDate = addDays(targetDate, 1);
      targetDateUTC = fromZonedTime(targetDate, TARGET_TIME_ZONE);
    }

    // Calculate the difference in seconds
    const difference = differenceInSeconds(targetDateUTC, now);

    if (difference <= 0) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }

    const hours = Math.floor((difference / 3600) % 24);
    const minutes = Math.floor((difference / 60) % 60);
    const seconds = Math.floor(difference % 60);

    return { hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const timerComponents = Object.entries(timeLeft).map(([unit, value]) => (
    <div key={unit} className="mx-2 text-center">
      <span className="text-4xl font-bold" aria-label={`${value} ${unit}`}>
        {String(value).padStart(2, "0")}
      </span>
      <span className="block text-sm uppercase">{unit}</span>
    </div>
  ));

  return (
    <Card className="max-w-md mx-auto mb-10 p-6 shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          <Link href="https://pump.fun/board">
            Countdown to{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 inline-block text-transparent bg-clip-text">
              $DPUMP
            </span>{" "}
            token launch on Pump.fun!
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        {timerComponents}
      </CardContent>
    </Card>
  );
};

export default CountdownTimer;
