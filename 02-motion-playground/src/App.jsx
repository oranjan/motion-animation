"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  IconX,
  IconMessage,
  Icon24Hours,
  Icon360View,
  IconSphere,
} from "@tabler/icons-react";

export default function AnimatedCard() {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.98,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              scale: 0.98,
              filter: "blur(10px)",
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="relative flex h-[28rem] min-h-[28rem] w-72 flex-col rounded-xl bg-white p-6 shadow-[0_0_20px_rgba(0,0,0,0.08)]"
          >
            {/* Header / Title Section */}
            <h2 className="text-[10px] font-bold tracking-wider text-black uppercase">
              Vercel UI Components
            </h2>
            <p className="mt-2 text-[10px] text-neutral-400">
              A collection of beautiful UI components. Let's get on with it.
            </p>

            {/* Middle Action Bar */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <img
                  src="/logo.svg"
                  alt="logo"
                  width={50}
                  height={50}
                  className="h-4 w-4"
                />
                <span className="text-[10px] font-medium text-black">
                  Vercel
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setOpen(false)}
                className="flex items-center justify-center rounded-md border border-neutral-200 p-1 shadow-sm transition-colors hover:bg-neutral-100"
              >
                <IconX className="h-3 w-3 text-neutral-400" />
              </button>
            </div>

            {/* Inner Interactive Hover Area */}
            <div className="relative mt-4 flex-1 rounded-lg border border-dashed border-neutral-200 bg-gray-100">
              {/* Hover overlay component using motion */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.98,
                  filter: "blur(10px)",
                }}
                whileHover={{
                  opacity: 1,
                  scale: 1.05,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 flex h-full w-full flex-col divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white p-4 shadow-lg"
              >
                <div className="flex items-center gap-2 py-2">
                  <IconMessage className="h-4 w-4 text-neutral-600" />
                  <span className="text-[10px] font-medium text-neutral-700">
                    Direct Messaging Included
                  </span>
                </div>

                <div className="flex items-center gap-2 py-2">
                  <Icon24Hours className="h-4 w-4 text-neutral-600" />
                  <span className="text-[10px] font-medium text-neutral-700">
                    24 Hours Turnaround
                  </span>
                </div>

                <div className="flex items-center gap-2 py-2">
                  <Icon360View className="h-4 w-4 text-neutral-600" />
                  <span className="text-[10px] font-medium text-neutral-700">
                    360 Days All Around Support
                  </span>
                </div>

                <div className="flex items-center gap-2 py-2">
                  <IconSphere className="h-4 w-4 text-neutral-600" />
                  <span className="text-[10px] font-medium text-neutral-700">
                    Global Network
                  </span>
                </div>

              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}