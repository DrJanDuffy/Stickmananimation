import { motion } from "framer-motion";

interface AnimatedLogoProps {
  small?: boolean;
}

export default function AnimatedLogo({ small = false }: AnimatedLogoProps) {
  return (
    <motion.div
      className={`${small ? "w-8 h-8" : "w-10 h-10"} rounded-full bg-primary flex items-center justify-center text-white font-['Comfortaa'] font-bold`}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      GK
    </motion.div>
  );
}
