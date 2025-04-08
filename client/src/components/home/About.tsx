import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaLinkedin, FaYoutube, FaAward, FaStar } from "react-icons/fa";

interface TimelineEventProps {
  year: string;
  event: string;
  highlight?: boolean;
}

const timelineEvents: TimelineEventProps[] = [
  { year: "2016", event: "Started learning 2D animation as a hobby" },
  { year: "2018", event: "Created first short animation and uploaded to YouTube" },
  { year: "2019", event: "Completed online animation course from Animation Mentor", highlight: true },
  { year: "2020", event: "Launched \"gkanimates\" YouTube channel to share animation tutorials", highlight: true },
  { year: "2021", event: "First animation tutorial reached 50,000 views" },
  { year: "2022", event: "Collaborated with other animators on a short film project" },
  { year: "2023", event: "Reached 100K subscribers milestone on YouTube", highlight: true },
  { year: "Present", event: "Working as freelance animator and YouTube content creator" },
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
                src="https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Gene Kelly Boyle - Animation Creator" 
                className="relative z-10 rounded-lg w-full object-cover aspect-[3/4] shadow-lg"
              />
              
              {/* YouTube Creator Badge */}
              <motion.div 
                className="absolute top-4 right-4 bg-white dark:bg-gray-800 backdrop-blur-sm py-2 px-3 rounded-full shadow-md z-20 flex items-center gap-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -2 }}
              >
                <FaYoutube className="text-red-600 text-lg" />
                <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">Creator</span>
              </motion.div>
              
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
              
              {/* Subscriber Milestone Badge */}
              <motion.div 
                className="absolute -bottom-4 left-4 bg-red-500 dark:bg-red-600 text-white py-2 px-4 rounded-full shadow-lg z-20 flex items-center gap-2 text-sm font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1, duration: 0.5 }}
                whileHover={{ y: -3 }}
              >
                <FaYoutube size={16} className="animate-pulse" /> 100K Subscribers
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
                I'm a passionate animator and <span className="font-semibold text-primary">YouTube content creator</span> specializing in character animation, motion graphics, and animation tutorials. My journey began as a self-taught animator in 2016, and I've been growing my skills and community ever since.
              </p>
              <p>
                My animation style focuses on fluid character movement and expressive storytelling. I love breaking down complex animation principles into accessible tutorials that help aspiring animators develop their skills and find their unique creative voice.
              </p>
              <p>
                As the creator behind the "gkanimates" YouTube channel, I share weekly animation tips, software tutorials, and behind-the-scenes looks at my creative process. My goal is to build a supportive community where animation enthusiasts can learn, collaborate, and grow together.
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
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <FaYoutube className="text-xl" />
                  <span>Animation Tutorial Expert</span>
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
