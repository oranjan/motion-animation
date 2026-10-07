// Tom Riddle's diary from Harry Potter and the Chamber of Secrets:
// Harry writes in it and the diary writes back.
const lines = [
  { from: "harry", text: "My name is Harry Potter." },
  {
    from: "diary",
    text: "Hello, Harry Potter. My name is Tom Riddle. How did you come by my diary?",
  },
];

import { useAnimate, stagger, motion } from "motion/react"
import { useEffect } from "react";

export default function Diary() {
  const [scope, animate] = useAnimate()


  // Runs once on mount
  useEffect(() => {
    // Every word in both lines, one after another
    animate('.word', {
      opacity: 1,
      filter: "blur(0px)",
      y: 0
    }, {
      duration: 0.3,
      ease: "easeInOut",
      delay: stagger(0.05)

    })
  }, [animate])
  return (
    <article
      aria-label="Tom Riddle's diary"
      className="relative min-h-[70vh] w-full max-w-xl overflow-hidden rounded-sm rounded-r-lg bg-[radial-gradient(ellipse_at_center,#f6edd6_0%,#ecdcb8_65%,#d8c193_100%)] px-8 py-12 pl-14 shadow-[0_24px_60px_rgba(0,0,0,0.6)] sm:px-12 sm:pl-16"
    >
      {/* Shadow where the page meets the spine */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-10 bg-linear-to-r from-black/30 via-black/10 to-transparent"
      />

      <ol ref={scope} className="relative space-y-10">
        {lines.map((line, i) => {
          const harry = line.from === "harry";
          return (
            <li key={i}>
              <p
                className={
                  harry
                    ? "font-harry text-3xl leading-snug text-ink sm:text-4xl"
                    : "font-diary text-2xl leading-relaxed text-ink-faded italic sm:text-3xl"
                }
              >
                <span className="sr-only">
                  {harry ? "Harry writes: " : "The diary replies: "}
                </span>
                {/* One span per word so the stagger reveals each line word by word.
                    inline-block lets y move each word; mr adds the space between them */}
                {line.text.split(" ").map((word, w) => (
                  <motion.span
                    key={w}
                    style={{
                      opacity: 1,
                      y: 10,
                      filter: "blur(10px)",
                    }}
                    className="word mr-[0.25em] inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </p>
            </li>
          );
        })}
      </ol>

    </article>
  );
}
