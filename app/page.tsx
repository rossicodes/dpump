// app/page.tsx

import React from "react";
import OpenAIAssistant from "@/app/ui/openai-assistant";
import Donald from "@/app/donald";
import ConditionalAssistant from "@/app/components/ConditionalAssistant"; // Import the new client component

export default function Home() {
  return (
    <main>
      <div className="mx-auto mb-12 max-w-lg text-center">
        <div className="m-4">
          <Donald />
        </div>
        <ConditionalAssistant />{" "}
        {/* Use the client component for conditional rendering */}
      </div>
    </main>
  );
}
