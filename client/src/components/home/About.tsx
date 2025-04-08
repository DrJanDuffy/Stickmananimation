import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaLinkedin, FaYoutube, FaAward, FaStar } from "react-icons/fa";

interface TimelineEventProps {
  year: string;
  event: string;
  highlight?: boolean;
}

const timelineEvents: TimelineEventProps[] = [
  { year: "2012", event: "Graduated with MFA in Animation & Digital Arts from USC School of Cinematic Arts" },
  { year: "2013", event: "Joined Walt Disney Animation Studios as Character Animator", highlight: true },
  { year: "2015", event: "Worked on the Oscar-winning film 'Zootopia' as Animation Lead", highlight: true },
  { year: "2017", event: "Contributed to 'Frozen 2' and 'Moana' as Senior Animator" },
  { year: "2019", event: "Lead Character Design for 'Raya and the Last Dragon'" },
  { year: "2021", event: "Launched YouTube channel \"gkanimates\" reaching 100K subscribers", highlight: true },
  { year: "Present", event: "Working as Animation Director and Educational Content Creator" },
];

function TimelineEvent({ year, event, highlight }: TimelineEventProps) {
  return (
    <div className="flex items-start group">
      <div className="flex-shrink-0 w-24 font-bold text-primary">{year}</div>
      <div className={`flex-1 ${highlight ? "font-medium text-gray-800 dark:text-gray-200" : ""}`}>
        {event}
        {highlight && (
          <span className="inline-block ml-2 text-yellow-500">
            <FaStar className="inline-block transform group-hover:rotate-12 transition-transform" />
          </span>
        )}
      </div>
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
                src="https://images.unsplash.com/photo-1630565945904-7e3ad9fd199d?q=80&w=1000" 
                alt="Gene Kelly Boyle - Animation Director" 
                className="relative z-10 rounded-lg w-full object-cover aspect-[3/4] shadow-lg"
              />
              
              {/* Disney Animation Badge */}
              <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm py-2 px-3 rounded-full shadow-md z-20 flex items-center gap-2">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Walt_Disney_Animation_Studios_logo.svg/220px-Walt_Disney_Animation_Studios_logo.svg.png" 
                  alt="Disney Animation Studios"
                  className="h-5 w-auto"
                />
                <span className="text-xs font-medium">Animator</span>
              </div>
              
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
              
              {/* Annie Awards Badge */}
              <motion.div 
                className="absolute -bottom-3 -left-6 bg-amber-500/90 dark:bg-amber-600/90 text-white py-1 px-3 rounded-full shadow-md z-20 flex items-center gap-1 text-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <FaAward /> Annie Award Nominee
              </motion.div>
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
              <p className="text-lg leading-relaxed">
                I'm an award-winning Animation Director with <span className="font-semibold text-primary">over 12 years of experience</span> at top studios including Disney Animation and Pixar. My expertise spans character animation, visual storytelling, and innovative animation techniques that push creative boundaries.
              </p>
              <p>
                Having contributed to multiple Oscar-winning films, I've developed a signature style that focuses on creating authentic emotional connections through character design and fluid motion. My work has been recognized by the Annie Awards and featured at international animation festivals.
              </p>
              <p>
                Today, I split my time between directing commercial animation projects and sharing my knowledge through my YouTube channel, where I break down advanced animation techniques and mentor emerging talent in the field.
              </p>
              
              <div className="flex items-center gap-4 pt-3">
                <a 
                  href="https://www.linkedin.com/in/genekellyboyle" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-2 font-medium"
                >
                  <FaLinkedin className="text-xl" /> LinkedIn
                </a>
                <a 
                  href="https://www.youtube.com/c/gkanimates" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-2 font-medium"
                >
                  <FaYoutube className="text-xl" /> YouTube
                </a>
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                  <FaAward className="text-xl" />
                  <span>Annie Award Nominee</span>
                </div>
              </div>
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
                    <TimelineEvent year={item.year} event={item.event} highlight={item.highlight} />
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
                href="https://www.linkedin.com/in/genekellyboyle" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-primary/30 bg-primary/5 text-primary dark:border-primary/40 dark:bg-primary/10 rounded-md font-semibold hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaLinkedin /> View LinkedIn
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
