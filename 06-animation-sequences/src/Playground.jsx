import { useAnimate,motion } from "motion/react";
import { useRef } from "react";

// Empty page for the next sequence experiment
export default function Playground() {
  const [scope, animate] = useAnimate();
  const paid=useRef(false)

  // Each step starts after the previous one ends
  const pay = () => {
    if(paid.current)return
    paid.current=true
    // own call, not inside the array: a sequence step ignores repeat: Infinity, so it would spin only once
    animate(".loader", { rotate: 360 }, { duration: 1, ease: "linear", repeat: Infinity });

    animate([
      [".loader", { opacity: 1 }, { duration: 0.3 }],
      [".loader", { opacity: 0 }, { at: "+0.3", ease: "easeIn" }],
      ["span", { opacity: 0 }, { duration: 0.3, at: "-0.3", ease: "easeIn" },],


      // maxHeight / maxWidth go to 5rem too, else the 50px cap stops the height halfway and it jerks
      [
        scope.current,
        { width: "50px", height: "50px", maxWidth: "50px", maxHeight: "50px", backgroundColor: "#22c55e" },
        {
          duration: 0.3, ease: "easeOut"
        },
      ],
      ['.tick', { opacity: 1, }, { duration: 0.1 }],
      [".tick-path", { pathLength: 1 }, { duration: 0.3, type: "tween", ease: "easeOut" }],]);
  };

  return (
    <section className="min-h-[70vh] w-full max-w-xl rounded-lg bg-[#f6edd6] p-12 text-ink shadow-[0_24px_60px_rgba(0,0,0,0.6)] overflow-hidden">

      <motion.button
        ref={scope}
        onClick={pay}
        style={{
          width: "200px", height: "50px",
          maxWidth: "200px",
          maxHeight: "50px",
          scale: 1
        }}
        className="mt-8 px-3 py-2 relative rounded-full bg-[#635bff] font-sans font-medium  text-white  flex items-center justify-center gap-2 text-center mx-auto"
      >
        <span>Pay Now 99$</span>

        {/* faint full ring + a quarter arc on top, spinning */}
        <motion.svg
          style={{
            opacity: 0,
            position: "absolute",
            right: 20,
            top: "50%",
            marginTop: -10,
          }}
          className="loader   size-5 "
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
          <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </motion.svg>

        {/* tick for the paid state, hidden and centred like the loader */}
        <motion.svg
          style={{
            opacity:0,
            position: "absolute",
            left: "50%",
            top: "50%",
            marginLeft: -12,
            marginTop: -12,
          }}
          className="tick size-6"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <motion.path
            style={{
              pathLength: 0,
            }}
            className="tick-path"
            d="M5 12.5l4.5 4.5L19 7.5"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>

      </motion.button>
    </section>
  );
}
