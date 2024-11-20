// app/page.tsx

import React from "react";
import Donald from "@/app/donald";
import ConditionalAssistant from "@/app/components/ConditionalAssistant"; // Import the new client component
import { FaTelegram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="mx-auto mb-12 max-w-lg text-center">
        <div className="m-4">
          <Donald />
        </div>
        <ConditionalAssistant />
      </div>
      <div className="flex flex-row justify-center items-center text-4xl space-x-6 pt-20">
        <Link href="https://t.me/realdonaldpumpai">
          <FaTelegram />
        </Link>
        <Link href="https://x.com/DonaldPump_Ai">
          <BsTwitterX />
        </Link>
      </div>
    </main>
  );
}
