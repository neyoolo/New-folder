import React, { useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  ExternalLink,
  Github,
  Smartphone,
  Globe,
  Zap,
  Eye,
  Heart,
  Star,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const Projects = () => {
  const [filter, setFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: "My weather app",
      subtitle: "A WEATHER APP",
      description:
        '"Get instant, accurate weather for your exact location with our intuitive weather app, your essential tool for daily planning and safety. See current temperature, hourly forecasts, and extended outlooks, plus crucial details like wind speed, UV index, and air quality.',
      image: "./build/assets/images/weather app.PNG",
      category: "web",
      technologies: [
        "html",
        "java scrpit",
        "tailwind css",
        "",
        "typescript",
        "weather api",
      ],
      liveUrl: "https://neyoolo.github.io/srco/",
      githubUrl: "#",
      stats: { views: "", likes: "", stars: "" },
      featured: true,
      complexity: 30,
    },
    {
      id: 2,
      title: "portfolio",
      subtitle: "My portfolio website",
      description:
        "A responsive portfolio website showcasing my projects and skills.",
      image: "./build/assets/images/pic 1.PNG",
      category: "web",
      technologies: [
        "javascript",
        "react",
        "html",
        "tailwind css",
        " motion.js",
        " typescript",
      ],
      liveUrl: "#",
      githubUrl: "#",
      stats: { views: "", likes: "", stars: "" },
      featured: true,
      complexity: 70,
    },
    {
      id: 3,
      title: "My task list",
      subtitle: "my todo list",
      description:
        "A simple and efficient todo list application with drag-and-drop functionality.",
      image: "./build/assets/images/todo task.PNG",
      category: "web",
      technologies: [
        "javascript",
        "html",
        "tailwindcss",
        "typescript",
        "",
        "",
      ],
      liveUrl: "https://neyoolo.github.io/my-todo-list/",
      githubUrl: "#",
      stats: { views: "", likes: "", stars: "" },
      featured: true,
      complexity: 50,
    },

    //   id: 6,
    //   title: "AR Commerce Space",
    //   subtitle: "Spatial Shopping Experience",
    //   description:
    //     "Revolutionary augmented reality shopping platform that allows users to visualize products in their space with photorealistic rendering and spatial audio.",
    //   image:
    //     "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=600&h=400&fit=crop",
    //   category: "mobile",
    //   technologies: [
    //     "Unity",
    //     "ARCore",
    //     "C#",
    //     "Firebase",
    //     "Spatial Audio",
    //     "WebXR",
    //   ],
    //   liveUrl: "#",
    //   githubUrl: "#",
    //   stats: { views: "2.9M", likes: "56K", stars: "1.3K" },
    //   featured: false,
    //   complexity: 90,
    // },
  ];

  const filters = [
    { id: "all", label: "All Dimensions", icon: Zap },
    { id: "web", label: "Web Universe", icon: Globe },
    // { id: "mobile", label: "Mobile Reality", icon: Smartphone },
  ];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  // 3D Card Component
  const ProjectCard3D = ({
    project,
    index,
  }: {
    project: any;
    index: number;
  }) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [30, -30]);
    const rotateY = useTransform(x, [-100, 100], [-30, 30]);
    const parallaxTransform = useMotionTemplate`translateX(${rotateY}px) translateY(${rotateX}px) scale(1.1)`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set(e.clientX - centerX);
      y.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.2 }}
        className="relative group perspective-1000"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setSelectedProject(project.id)}
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative"
          whileHover={{ z: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-red-600/40 hover:border-red-400 transition-all duration-700 overflow-hidden backdrop-blur-sm transform-gpu">
            {/* Holographic Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-red-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Complexity Indicator */}
            <div className="absolute top-4 right-4 z-20">
              <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-full px-3 py-1 text-xs text-white font-mono glow-effect">
                {project.complexity}% Complex
              </div>
            </div>

            {/* Featured Badge */}
            {project.featured && (
              <motion.div
                className="absolute top-4 left-4 z-20"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full px-3 py-1 text-xs text-white font-mono">
                  ⭐ FEATURED
                </div>
              </motion.div>
            )}

            {/* Image Container with Parallax */}
            <div className="relative h-64 overflow-hidden">
              <motion.div
                style={{
                  transform: parallaxTransform,
                }}
                className="absolute inset-0"
              >
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </motion.div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* Hover Overlay with Actions */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500"
                style={{ transform: "translateZ(20px)" }}
              >
                <div className="flex gap-4">
                  <Button
                    size="sm"
                    className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 glow-effect transform hover:scale-110 transition-transform"
                    asChild
                  >
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-black rounded-full p-4 transform hover:scale-110 transition-transform"
                    asChild
                  >
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={20} />
                    </a>
                  </Button>
                </div>
              </motion.div>

              {/* Stats Overlay */}
              <div className="absolute bottom-4 left-4 flex gap-4 text-xs text-gray-300">
                <div className="flex items-center gap-1">
                  <Eye size={12} />
                  {project.stats.views}
                </div>
                <div className="flex items-center gap-1">
                  <Heart size={12} />
                  {project.stats.likes}
                </div>
                <div className="flex items-center gap-1">
                  <Star size={12} />
                  {project.stats.stars}
                </div>
              </div>
            </div>

            <CardContent
              className="p-8 relative"
              style={{ transform: "translateZ(10px)" }}
            >
              <div className="mb-4">
                <h3 className="text-2xl mb-2 text-white group-hover:text-red-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-red-500 font-mono text-sm">
                  {project.subtitle}
                </p>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech: string, techIndex: number) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: techIndex * 0.1 }}
                  >
                    <Badge
                      variant="secondary"
                      className="bg-red-600/20 text-red-400 border-red-600/30 hover:bg-red-600/30 transition-colors duration-300 font-mono text-xs"
                    >
                      {tech}
                    </Badge>
                  </motion.div>
                ))}
              </div>

              {/* Progress Bar for Complexity */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-400 mb-2">
                  <span>Technical Complexity</span>
                  <span>{project.complexity}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-red-600 to-red-400 glow-effect"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${project.complexity}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                </div>
              </div>
            </CardContent>

            {/* Holographic Scanlines */}
            <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
              <div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/20 to-transparent h-full animate-pulse"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(220, 38, 38, 0.1) 2px, rgba(220, 38, 38, 0.1) 4px)",
                  animation: "scan 3s linear infinite",
                }}
              />
            </div>
          </Card>
        </motion.div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-red-500 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <section
      id="projects"
      className="py-32 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden"
    >
      {/* Complex Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Geometric Patterns */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern
                id="circuit"
                x="0"
                y="0"
                width="200"
                height="200"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M50,50 L150,50 L150,150 L50,150 Z"
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="1"
                />
                <circle cx="50" cy="50" r="3" fill="#dc2626" />
                <circle cx="150" cy="150" r="3" fill="#dc2626" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)" />
          </svg>
        </div>

        {/* Floating Energy Orbs */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-red-600/20 to-red-800/20 blur-2xl"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2
            className="text-7xl mb-8 bg-gradient-to-r from-white via-red-300 to-red-500 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            Project Multiverse
          </motion.h2>
          <div className="relative">
            <div className="w-32 h-1 bg-gradient-to-r from-red-600 via-red-400 to-red-600 mx-auto mb-12 rounded-full" />
            <motion.div
              className="absolute inset-0 w-32 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto rounded-full"
              animate={{ x: [-128, 128, -128] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto">
            A curated collection of revolutionary digital experiences that push
            the boundaries of what's possible in the digital realm.
          </p>
        </motion.div>

        {/* Enhanced Filter System */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-16"
        >
          <div className="flex flex-wrap gap-6 p-4 bg-gradient-to-r from-gray-800/80 to-gray-900/80 rounded-3xl border border-red-600/30 backdrop-blur-sm">
            {filters.map((filterItem) => {
              const Icon = filterItem.icon;
              return (
                <Button
                  key={filterItem.id}
                  onClick={() => setFilter(filterItem.id)}
                  variant={filter === filterItem.id ? "default" : "ghost"}
                  className={`flex items-center gap-3 px-8 py-4 rounded-2xl transition-all duration-500 text-lg relative overflow-hidden ${
                    filter === filterItem.id
                      ? "bg-gradient-to-r from-red-600 to-red-800 text-white glow-effect"
                      : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                  }`}
                >
                  {filter === filterItem.id && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-800/20"
                      layoutId="activeFilter"
                      transition={{ type: "spring", duration: 0.6 }}
                    />
                  )}
                  <Icon size={20} />
                  <span className="relative z-10">{filterItem.label}</span>
                </Button>
              );
            })}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div className="grid lg:grid-cols-2 gap-12 mb-20">
          {filteredProjects.map((project, index) => (
            <ProjectCard3D key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="relative inline-block">
            <Button
              className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white px-12 py-6 rounded-2xl glow-effect transition-all duration-500 transform hover:scale-105 text-xl relative overflow-hidden"
              asChild
            >
              <a href="#contact">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: [-200, 200] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
                <span className="relative z-10">
                  Initialize Collaboration Protocol
                </span>
              </a>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* CSS for additional animations */}
      <style>{`
        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100vh);
          }
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
};

export default Projects;
