import { motion } from "framer-motion";
import AnimatedGradient from "../ui/AnimatedGradient";
import ScrollIndicator from "../ui/ScrollIndicator";
import { useQuery } from "@tanstack/react-query";
import { getLatestShowreel } from "@/lib/youtube";
import { FaPlay } from "react-icons/fa";

export default function Hero() {
  const { data: showreelData, isLoading } = useQuery({ 
    queryKey: ["/api/videos/showreel"],
    staleTime: 60 * 60 * 1000, // 1 hour
  });

  const showreelVideoId = showreelData?.videoId || "";

  return (
    <section id="home">
      <AnimatedGradient>
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div 
            className="md:w-1/2 text-white space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full mb-2">
              <p className="text-sm font-medium">Animation Artist & Storyteller</p>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-['Poppins'] font-bold leading-tight">
              Bringing <span className="text-[#00BFA6]">stories</span> to life through animation
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-lg">
              Creating memorable characters and captivating animated stories that inspire and entertain audiences worldwide.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <motion.a 
                href="#portfolio" 
                className="px-6 py-3 bg-white text-primary font-semibold rounded-md shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.a>
              <motion.a 
                href="#contact" 
                className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-md hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border-4 border-white/20">
              {isLoading || !showreelVideoId ? (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary mb-4">
                      <FaPlay className="text-white text-xl" />
                    </div>
                    <p className="font-medium">Showreel Loading...</p>
                  </div>
                </div>
              ) : (
                <iframe 
                  src={`https://www.youtube.com/embed/${showreelVideoId}?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&rel=0&showinfo=0`}
                  title="Showreel"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
            
            <motion.div 
              className="absolute -top-6 -right-6 w-20 h-20 bg-[#00BFA6] rounded-full opacity-60"
              animate={{ 
                y: [0, -10, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
            <motion.div 
              className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary rounded-full opacity-60"
              animate={{ 
                y: [0, -10, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1 
              }}
            />
          </motion.div>
        </div>
        
        <ScrollIndicator />
      </AnimatedGradient>
    </section>
  );
}
