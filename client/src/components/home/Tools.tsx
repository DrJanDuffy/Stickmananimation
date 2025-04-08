import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  FaCode, 
  FaDesktop, 
  FaLaptop, 
  FaTabletAlt, 
  FaCamera, 
  FaHdd 
} from "react-icons/fa";

// Software tools with skill level
const softwareTools = [
  { name: "Adobe After Effects", level: 95, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-plain.svg" },
  { name: "Blender", level: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg" },
  { name: "Cinema 4D", level: 85, icon: "https://cdn.cdnlogo.com/logos/c/40/cinema-4d.svg" },
  { name: "ToonBoom Harmony", level: 90, icon: "https://www.toonboom.com/sites/default/files/logos/Harmony-icon-light.svg" },
  { name: "Adobe Photoshop", level: 88, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" },
];

// Hardware tools
const hardwareTools = [
  { name: "Custom Built Workstation", description: "32GB RAM, RTX 3080, i9 Processor", icon: <FaLaptop /> },
  { name: "Wacom Cintiq Pro 24", description: "Drawing tablet with screen", icon: <FaTabletAlt /> },
  { name: "DSLR Camera Setup", description: "For reference footage and stop motion", icon: <FaCamera /> },
  { name: "Storage Solution", description: "24TB RAID setup for project files", icon: <FaHdd /> },
];

export default function Tools() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="tools" className="py-20 bg-white dark:bg-gray-900" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-['Poppins'] font-bold mb-4">
            Tools & <span className="text-primary">Equipment</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            The software and hardware I use to bring my animations to life
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Software */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h3 className="font-['Poppins'] font-semibold text-xl mb-6 flex items-center">
              <FaCode className="text-primary mr-3" />
              Software
            </h3>
            <div className="space-y-4">
              {softwareTools.map((tool, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  variants={itemVariants}
                >
                  <img src={tool.icon} alt={tool.name} className="w-10 h-10 mr-4" />
                  <div className="flex-1">
                    <h4 className="font-medium">{tool.name}</h4>
                    <div className="mt-1 bg-gray-200 dark:bg-gray-700 h-2 rounded-full w-full">
                      <motion.div 
                        className="bg-primary h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${tool.level}%` } : {}}
                        transition={{ duration: 1, delay: 0.3 + (index * 0.1) }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Hardware */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h3 className="font-['Poppins'] font-semibold text-xl mb-6 flex items-center">
              <FaDesktop className="text-primary mr-3" />
              Hardware
            </h3>
            <div className="relative">
              <motion.img 
                src="https://images.unsplash.com/photo-1593642533144-3d62aa4783ec" 
                alt="Animation workspace" 
                className="w-full rounded-lg h-64 object-cover mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6 }}
              />
              
              <div className="space-y-4">
                {hardwareTools.map((tool, index) => (
                  <motion.div 
                    key={index}
                    className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center"
                    variants={itemVariants}
                  >
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                      {tool.icon}
                    </div>
                    <div>
                      <h4 className="font-medium">{tool.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{tool.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
