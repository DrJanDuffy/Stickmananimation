import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaSketch, FaLaptopCode, FaMagic, FaFilm, FaPlay, FaCode, FaTools, FaChartLine } from "react-icons/fa";
import { getLongestVideo } from "@/lib/youtube";
import { useQuery } from "@tanstack/react-query";

export default function CreativeProcess() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [selectedProcess, setSelectedProcess] = useState("concept");
  
  // Fetch the longest video for featured example
  const { data: longestVideo, isLoading, error } = useQuery({
    queryKey: ['/api/videos/longest'],
    queryFn: getLongestVideo
  });

  // Animation process data
  const animationProcess = {
    concept: {
      title: "Concept Development",
      icon: <FaSketch className="text-3xl text-primary" />,
      description: "Every animation begins with sketches, storyboards, and character designs that establish the foundation of the project.",
      tools: ["Adobe Photoshop", "Procreate", "Traditional Sketching", "Storyboarding Software"],
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e",
      animation: {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
      }
    },
    rigging: {
      title: "Character Rigging",
      icon: <FaTools className="text-3xl text-primary" />,
      description: "Creating the skeletal structure that allows characters to move naturally and expressively within the animation.",
      tools: ["Adobe Animate", "After Effects", "Advanced Jointing Systems", "Inverse Kinematics"],
      image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead",
      animation: {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }
    },
    animation: {
      title: "Animation & Movement",
      icon: <FaLaptopCode className="text-3xl text-primary" />,
      description: "Bringing characters and elements to life through careful keyframing and timing to create believable motion.",
      tools: ["Adobe Animate", "After Effects", "Frame-by-Frame Animation", "Tweening"],
      image: "https://images.unsplash.com/photo-1621600411688-4be93c2c1208",
      animation: {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
      }
    },
    effects: {
      title: "Visual Effects & Rendering",
      icon: <FaMagic className="text-3xl text-primary" />,
      description: "Adding lighting, textures, and special effects to enhance the visual appeal and atmosphere of the animation.",
      tools: ["After Effects", "Premiere Pro", "Particle Systems", "Dynamic Lighting"],
      image: "https://images.unsplash.com/photo-1620283085068-9e9a5b54ea3b",
      animation: {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }
    }
  };

  // Professional skills
  const professionalSkills = [
    { name: "2D Animation", level: 95 },
    { name: "Character Design", level: 90 },
    { name: "Storyboarding", level: 85 },
    { name: "Digital Storytelling", level: 88 },
    { name: "Video Editing", level: 82 },
    { name: "YouTube Management", level: 80 }
  ];

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
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="process" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-['Poppins'] font-bold mb-4">
            Behind the <span className="text-primary">Scenes</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A glimpse into my creative process from concept to final animation
          </p>
        </motion.div>

        {/* Animation Process Tabs */}
        <motion.div 
          className="mb-10 flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {Object.entries(animationProcess).map(([key, process]) => (
            <button
              key={key}
              onClick={() => setSelectedProcess(key)}
              className={`px-5 py-3 rounded-full flex items-center gap-2 font-medium transition-all ${
                selectedProcess === key 
                  ? "bg-primary text-white shadow-lg" 
                  : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
            >
              {process.icon}
              <span>{process.title}</span>
            </button>
          ))}
        </motion.div>

        {/* Selected Process Details */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div 
              className="h-64 md:h-auto bg-cover bg-center"
              style={{ backgroundImage: `url(${animationProcess[selectedProcess].image})` }}
            />
            <div className="p-8 md:p-10">
              <motion.div
                key={selectedProcess}
                initial="hidden"
                animate="visible"
                variants={animationProcess[selectedProcess].animation}
              >
                <div className="flex items-center gap-3 mb-4">
                  {animationProcess[selectedProcess].icon}
                  <h3 className="text-2xl font-['Poppins'] font-bold">{animationProcess[selectedProcess].title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {animationProcess[selectedProcess].description}
                </p>
                <div>
                  <h4 className="font-medium text-lg mb-3">Tools & Techniques</h4>
                  <div className="flex flex-wrap gap-2">
                    {animationProcess[selectedProcess].tools.map((tool, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Skills and Featured Animation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Professional Skills */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
              <FaChartLine className="text-2xl text-primary" />
              <h3 className="text-2xl font-['Poppins'] font-bold">Animation Skills</h3>
            </motion.div>
            
            <div className="space-y-5">
              {professionalSkills.map((skill, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="space-y-2"
                >
                  <div className="flex justify-between">
                    <span className="font-medium">{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1, delay: 0.3 + (index * 0.1) }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Featured Animation */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
              <FaFilm className="text-2xl text-primary" />
              <h3 className="text-2xl font-['Poppins'] font-bold">Featured Animation</h3>
            </motion.div>
            
            {isLoading ? (
              <div className="h-64 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
              </div>
            ) : error ? (
              <div className="bg-red-100 dark:bg-red-900/20 p-4 rounded-xl text-red-800 dark:text-red-200">
                Failed to load the featured video. Please try again later.
              </div>
            ) : longestVideo ? (
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="aspect-video bg-black/10 dark:bg-black/30 rounded-xl overflow-hidden relative group">
                  <iframe
                    src={`https://www.youtube.com/embed/${longestVideo.videoId}?rel=0`}
                    title={longestVideo.title}
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <div className="absolute inset-0 bg-primary/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <FaPlay className="text-4xl text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-lg">{longestVideo.title}</h4>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                      {longestVideo.category}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      {longestVideo.duration}
                    </span>
                  </div>
                  {longestVideo.description && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-3 line-clamp-3">
                      {longestVideo.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="bg-yellow-100 dark:bg-yellow-900/20 p-6 rounded-xl text-yellow-800 dark:text-yellow-200">
                No videos found. Check back later for animation examples.
              </div>
            )}
          </motion.div>
        </div>
        
        {/* My Process Description */}
        <motion.div 
          className="mt-16 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <blockquote className="text-lg text-gray-600 dark:text-gray-300 italic">
            "I'm passionate about pushing the boundaries of digital animation and storytelling. My goal is to create animations that not only entertain but also inspire, combining technical expertise with creative vision."
          </blockquote>
          <div className="mt-4">
            <span className="font-medium text-primary">Gene Kelly Boyle</span>
            <p className="text-sm text-gray-500">Creator, Stickman Epic Legends</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
