import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react";

const Hero = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const titles = [
    "Web Developer",
    "",
    "Full Stack Engineer",
    "UI/UX Designer",
    "Graphic designer",
  ];

  useEffect(() => {
    const handleType = () => {
      const current = loopNum % titles.length;
      const fullText = titles[current];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 500);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, titles]);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-500 rounded-full opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Floating Avatar */}
          <motion.div
            className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-red-600 to-red-800 flex items-center justify-center glow-effect float-animation"
            whileHover={{ scale: 1.1 }}
          >
            <span className="text-4xl">N</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-6xl md:text-8xl mb-6 bg-gradient-to-r from-white via-red-200 to-red-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hello, I'm NEYOOLA
          </motion.h1>

          {/* Animated Typewriter Text */}
          <div className="text-2xl md:text-3xl mb-8 h-12 flex items-center justify-center">
            <span className="text-red-500">{"<"}</span>
            <span className="mx-2 text-white">{text}</span>
            <span className="text-red-500">{">"}</span>
            <motion.span
              className="ml-1 w-0.5 h-8 bg-red-500"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            I craft digital experiences that blur the lines between imagination
            and reality. Specializing in cutting-edge web applications and
            mobile solutions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              onClick={() => scrollToSection("projects")}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg glow-effect transition-all duration-300 transform hover:scale-105"
            >
              My Work
            </Button>
            <Button
              onClick={() => scrollToSection("contact")}
              variant="outline"
              className="border-red-600 text-red-500 hover:bg-red-600 hover:text-white px-8 py-4 rounded-lg glow-effect transition-all duration-300 transform hover:scale-105"
            >
              Get In Touch
            </Button>
            <Button
              variant="outline"
              className="border-red-600 text-red-500 hover:bg-red-600 hover:text-white px-8 py-4 rounded-lg glow-effect transition-all duration-300 transform hover:scale-105"
            >
              Download cv
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex justify-center gap-6 mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              {
                Icon: Github,
                href: "https://github.com/neyoolo",
                label: "GitHub",
              },
              {
                Icon: Linkedin,
                href: "https://www.linkedin.com/in/favour-ayoola-2105b823a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
                label: "LinkedIn",
              },
              { Icon: Mail, href: "ayomhi03@gmail.com", label: "Email" },
            ].map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                className="w-12 h-12 rounded-full bg-gray-800 border border-red-600 flex items-center justify-center text-red-500 hover:bg-red-600 hover:text-white transition-all duration-300"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Button
            variant="ghost"
            onClick={() => scrollToSection("about")}
            className="text-red-500 hover:text-red-400 flex flex-col items-center"
          >
            <span className="text-sm mb-2">Scroll Down</span>
            <ChevronDown size={20} />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
