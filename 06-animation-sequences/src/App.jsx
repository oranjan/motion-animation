import { useState } from "react";
import Diary from "./Diary";
import Playground from "./Playground";

export default function App() {
  const [showPlayground, setShowPlayground] = useState(false);

  return (
    <main className="grid min-h-screen place-items-center gap-6 bg-desk p-4">
      <button
        onClick={() => setShowPlayground((open) => !open)}
        className="rounded-full bg-[#f6edd6] px-5 py-2 font-diary text-ink"
      >
        {showPlayground ? "Back to diary" : "Open playground"}
      </button>

      {showPlayground ? <Playground /> : <Diary />}
    </main>
  );
}
