import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaLinkedin, FaYoutube, FaAward, FaStar, FaEnvelope } from "react-icons/fa";

interface TimelineEventProps {
  year: string;
  event: string;
  highlight?: boolean;
}

const timelineEvents: TimelineEventProps[] = [
  { year: "2016", event: "Started learning digital animation and storytelling techniques" },
  { year: "2018", event: "Developed early concepts for Stickman Epic Legends series" },
  { year: "2019", event: "Mastered Adobe Animate and After Effects for professional animation", highlight: true },
  { year: "2020", event: "Launched \"Stickman Epic Legends\" series on YouTube", highlight: true },
  { year: "2021", event: "Refined animation style focusing on fluid character motion and cinematic techniques" },
  { year: "2022", event: "Expanded animation repertoire to include advanced storytelling and comedy" },
  { year: "2023", event: "Achieved significant viewer growth with monthly animation releases", highlight: true },
  { year: "Present", event: "Continuing to innovate in stick figure animation on Animation Island" },
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
                src="/src/channels4_profile (2).jpg" 
                alt="GK Animates Logo" 
                className="relative z-10 rounded-lg w-full object-contain bg-white aspect-[3/4] shadow-lg p-4"
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
              className="space-y-5 text-gray-600 dark:text-gray-400"
              variants={itemVariants}
            >
              <p className="text-lg leading-relaxed">
                I'm passionate about pushing the boundaries of digital animation and storytelling. As the creator of <span className="font-semibold text-primary">"Stickman Epic Legends,"</span> I'm revolutionizing stick figure animation on YouTube, blending dynamic action, comedy, and cinematic techniques.
              </p>

              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Professional Highlights</h3>
                <ul className="list-disc list-inside space-y-1 ml-1">
                  <li>Developed and produce "Stickman Epic Legends," a cutting-edge animated YouTube series</li>
                  <li>Specialize in fluid character animation and innovative storytelling techniques</li>
                  <li>Proficient in Adobe Animate, After Effects, and other industry-standard animation tools</li>
                  <li>Release new high-quality animated content monthly, growing a dedicated audience</li>
                  <li>Combine traditional animation principles with modern digital techniques</li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4 my-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">2D Animation</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Character Design</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Storyboarding</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Digital Storytelling</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Video Editing</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">YouTube Management</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Current Focus</h3>
                  <p className="text-sm">
                    "Stickman Epic Legends" follows the adventures of Stickman on Animation Island, showcasing action-packed sequences, comedic storytelling, fluid character motion, and vibrant visuals.
                  </p>
                </div>
              </div>

              <p>
                I'm constantly refining my animation techniques and exploring new ways to engage audiences through visual storytelling. I combine traditional animation principles with modern digital techniques to create captivating stories that resonate with viewers worldwide.
              </p>
              
              <div className="flex items-center gap-4 pt-2">
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
                <a 
                  href="mailto:genekellyboyle@gmail.com" 
                  className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 flex items-center gap-2 font-medium"
                >
                  <FaEnvelope className="text-xl" /> Email
                </a>
              </div>
            </motion.div>
            
            <motion.div className="mt-8" variants={itemVariants}>
              <h3 className="font-['Poppins'] font-semibold text-xl mb-4">Seeking Connections</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                I'm always eager to connect with fellow animators, digital content creators, and professionals interested in:
              </p>
              <ul className="space-y-2 list-disc list-inside text-gray-600 dark:text-gray-400">
                <li>Emerging trends in digital animation</li>
                <li>The intersection of technology and creativity</li>
                <li>Collaborative opportunities in animation and digital content</li>
                <li>The evolving landscape of independent animation</li>
              </ul>
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
