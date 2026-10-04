
import { motion, useScroll } from "motion/react";

export default function ProgressBar() {
  const { scrollYProgress } = useScroll(); // no options = whole page

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}   // 0 → 1 maps straight to scaleX
      className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-emerald-600"
    />
  );
}
