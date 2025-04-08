import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TimelineEventProps {
  year: string;
  event: string;
}

const timelineEvents: TimelineEventProps[] = [
  { year: "2010", event: "Graduated with BFA in Animation" },
  { year: "2012", event: "First short film \"Connections\" released" },
  { year: "2015", event: "Joined Animation Studio as Lead Animator" },
  { year: "2018", event: "Won Best Animated Short at Film Festival" },
  { year: "2020", event: "Launched YouTube channel \"gkanimates\"" },
  { year: "Present", event: "Working as independent animation artist and educator" },
];

function TimelineEvent({ year, event }: TimelineEventProps) {
  return (
    <div className="flex">
      <div className="flex-shrink-0 w-24 font-bold text-primary">{year}</div>
      <div>{event}</div>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900/70" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <motion.div 
            className="md:w-2/5"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full bg-primary rounded-lg"></div>
              <img 
                src="https://images.unsplash.com/photo-1627672360124-4ed09583e14c" 
                alt="Gene Kelly Boyle - Animation Artist" 
                className="relative z-10 rounded-lg w-full object-cover aspect-[3/4] shadow-lg"
              />
              <motion.div 
                className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#00BFA6]/20 backdrop-blur-sm rounded-full"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-3/5"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-['Poppins'] font-bold mb-6"
              variants={itemVariants}
            >
              About <span className="text-primary">Gene Kelly Boyle</span>
            </motion.h2>
            
            <motion.div 
              className="space-y-4 text-gray-600 dark:text-gray-400"
              variants={itemVariants}
            >
              <p>
                I'm an animation artist with over 10 years of experience creating captivating stories through movement and visual storytelling. My journey began with traditional 2D animation and has evolved to encompass 3D, motion graphics, and experimental techniques.
              </p>
              <p>
                My work has been featured in several independent film festivals, and I've collaborated with brands to create memorable animated content that resonates with audiences.
              </p>
              <p>
                My animation philosophy centers on creating authentic emotional connections through character movement and expression. I believe that animation has the unique power to communicate complex ideas in accessible and engaging ways.
              </p>
            </motion.div>
            
            <motion.div className="mt-8" variants={itemVariants}>
              <h3 className="font-['Poppins'] font-semibold text-xl mb-4">My Animation Journey</h3>
              <div className="space-y-4">
                {timelineEvents.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                  >
                    <TimelineEvent year={item.year} event={item.event} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="mt-8 flex gap-4"
              variants={itemVariants}
            >
              <motion.a 
                href="#contact" 
                className="px-6 py-3 bg-primary text-white font-semibold rounded-md shadow-md hover:shadow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
              <motion.a 
                href="#" 
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-md font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download Resume
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
