import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import TimelineItem from "../ui/TimelineItem";
import { FaSmile, FaMeh, FaFrown, FaAngry, FaSurprise } from "react-icons/fa";

const expressions = [
  { icon: <FaSmile />, name: "Happy" },
  { icon: <FaMeh />, name: "Neutral" },
  { icon: <FaFrown />, name: "Sad" },
  { icon: <FaAngry />, name: "Angry" },
  { icon: <FaSurprise />, name: "Surprised" },
];

const movementStyles = ["Bouncy", "Smooth", "Robotic", "Fluid"];

export default function CreativeProcess() {
  const [animationSpeed, setAnimationSpeed] = useState(50);
  const [selectedExpression, setSelectedExpression] = useState(0);
  const [selectedMovement, setSelectedMovement] = useState("Bouncy");
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  const getAnimationStyle = () => {
    const duration = 3 - (animationSpeed / 50) * 2; // maps 0-100 to 3-1 seconds
    
    let animationStyle = {};
    
    switch (selectedMovement) {
      case "Bouncy":
        animationStyle = {
          y: [0, -30, 0],
          transition: { 
            duration, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }
        };
        break;
      case "Smooth":
        animationStyle = {
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
          transition: { 
            duration, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }
        };
        break;
      case "Robotic":
        animationStyle = {
          rotate: [0, 10, -10, 0],
          transition: { 
            duration: duration / 2, 
            repeat: Infinity, 
            ease: "steps(5)" 
          }
        };
        break;
      case "Fluid":
        animationStyle = {
          scale: [1, 1.2, 1, 0.8, 1],
          rotate: [0, 10, 0, -10, 0],
          transition: { 
            duration, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }
        };
        break;
      default:
        animationStyle = {
          y: [0, -20, 0],
          transition: { 
            duration, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }
        };
    }
    
    return animationStyle;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };

  return (
    <section id="process" className="py-20 bg-white dark:bg-gray-900" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-['Poppins'] font-bold mb-4">
            Behind the <span className="text-primary">Scenes</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            A glimpse into my creative process from concept to final animation
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <TimelineItem
            year="2023"
            title="Concept Development"
            index={0}
            imageUrl="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e"
          >
            Every animation begins with sketches, storyboards, and character designs that establish the foundation of the project.
          </TimelineItem>
          
          <TimelineItem
            year="2023"
            title="Character Rigging"
            index={1}
            reverse
            imageUrl="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead"
          >
            Creating the skeletal structure that allows characters to move naturally and expressively within the animation.
          </TimelineItem>
          
          <TimelineItem
            year="2023"
            title="Animation & Movement"
            index={2}
            imageUrl="https://images.unsplash.com/photo-1621600411688-4be93c2c1208"
          >
            Bringing characters and elements to life through careful keyframing and timing to create believable motion.
          </TimelineItem>
          
          <TimelineItem
            year="2023"
            title="Visual Effects & Rendering"
            index={3}
            reverse
            imageUrl="https://images.unsplash.com/photo-1620283085068-9e9a5b54ea3b"
          >
            Adding lighting, textures, and special effects to enhance the visual appeal and atmosphere of the animation.
          </TimelineItem>
        </motion.div>
        
        <motion.div 
          className="mt-16 bg-gray-100 dark:bg-gray-800 rounded-lg p-6 md:p-8"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h3 className="font-['Poppins'] font-semibold text-2xl mb-4">Interactive Animation Example</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                This interactive demo lets you control a simple character animation. Use the sliders to adjust speed, expression, and movement style.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Animation Speed</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={animationSpeed} 
                    onChange={(e) => setAnimationSpeed(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Character Expression</label>
                  <div className="flex gap-3">
                    {expressions.map((expression, index) => (
                      <button 
                        key={index}
                        className={`p-2 ${
                          selectedExpression === index 
                            ? "bg-primary text-white" 
                            : "bg-white dark:bg-gray-700"
                        } rounded-full`}
                        onClick={() => setSelectedExpression(index)}
                      >
                        {expression.icon}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Movement Style</label>
                  <select 
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                    value={selectedMovement}
                    onChange={(e) => setSelectedMovement(e.target.value)}
                  >
                    {movementStyles.map(style => (
                      <option key={style} value={style}>{style}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 bg-white dark:bg-gray-900 rounded-lg p-4 aspect-square flex items-center justify-center">
              <div className="text-center p-8">
                <motion.div 
                  className="w-24 h-24 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl"
                  animate={getAnimationStyle()}
                >
                  {expressions[selectedExpression].icon}
                </motion.div>
                <p className="text-gray-600 dark:text-gray-400">
                  {expressions[selectedExpression].name} + {selectedMovement}
                </p>
                <p className="text-xs text-gray-500 mt-2">Speed: {animationSpeed}%</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
