
import React, { useState, useEffect } from 'react';
import { ChevronDown, Github, Linkedin, Mail, ExternalLink, Code, User, Briefcase, Star, Download, Phone, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import LeetCodeProfile from '@/components/LeetCodeProfile';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'leetcode', 'resume', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const skills = [
    { name: 'Python', level: 85, color: 'from-blue-400 to-blue-600', icon: '🐍' },
    { name: 'Java', level: 80, color: 'from-orange-400 to-red-500', icon: '☕' },
    { name: 'JavaScript', level: 88, color: 'from-yellow-400 to-orange-500', icon: '⚡' },
    { name: 'React.js', level: 90, color: 'from-cyan-400 to-blue-500', icon: '⚛️' },
    { name: 'Node.js', level: 75, color: 'from-green-400 to-green-600', icon: '🚀' },
    { name: 'Spring Boot', level: 70, color: 'from-green-500 to-green-700', icon: '🍃' },
    { name: 'Firebase', level: 82, color: 'from-yellow-400 to-orange-600', icon: '🔥' },
    { name: 'GitHub', level: 85, color: 'from-gray-400 to-gray-600', icon: '🐙' },
  ];

  const projects = [
    {
      title: 'Class Archive',
      description: 'A web-based platform designed to store and manage lecture materials for educational institutions. Students can easily access and download various types of files (PDFs, images, presentations, etc.), organized by subject for convenient browsing.',
      tech: ['React.js', 'Node.js', 'Express.js', 'Firebase'],
      github: 'https://github.com/bhanuteja449896/ad1',
      features: ['Centralized repository for students', 'Admin functionality for content management', 'Subject-wise organization', 'Multiple file format support']
    },
    {
      title: 'Gatepass Management System',
      description: 'A college security management system designed to streamline the student gate pass approval process. Students request permission from their HOD, and upon approval, security personnel can verify permissions in real-time.',
      tech: ['React.js', 'Node.js', 'MongoDB', 'Express.js'],
      github: 'https://github.com/bhanuteja449896/gatepass',
      features: ['HOD approval workflow', 'Real-time verification', 'Database integration', 'Security personnel access']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                BT
              </span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {['home', 'about', 'skills', 'projects', 'leetcode', 'resume', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 capitalize ${
                      activeSection === item
                        ? 'text-cyan-400 bg-white/10'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="md:hidden">
              <Button variant="ghost" size="sm">
                ☰
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-cyan-500/20"></div>
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white/5 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 3 + 2}s`
              }}
            />
          ))}
        </div>
        
        <div className={`text-center z-10 px-4 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 p-1">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                <User className="w-16 h-16 text-blue-400" />
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-lg text-gray-300 mb-2">Hi, I'm</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
              Bhanu Teja Makkineni
            </h1>
            <p className="text-xl md:text-2xl text-cyan-400 mb-2">React.js Developer</p>
            <p className="text-lg text-gray-300 mb-8">Based in Hyderabad, India</p>
          </div>

          <div className="flex items-center justify-center gap-2 mb-8 text-gray-300">
            <Phone className="w-4 h-4" />
            <span>(+91) 8328653599</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              onClick={() => scrollToSection('projects')}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              View My Work
            </Button>
            <Button 
              variant="outline" 
              onClick={() => scrollToSection('contact')}
              className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white px-8 py-3 rounded-full transition-all duration-300"
            >
              Get In Touch
            </Button>
          </div>
          
          <div className="flex justify-center space-x-6">
            <a href="https://github.com/bhanuteja449896" target="_blank" rel="noopener noreferrer" 
               className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 transform hover:scale-110">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/bhanu-teja-makkineni-a65310265" target="_blank" rel="noopener noreferrer"
               className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 transform hover:scale-110">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:bhanutejamakkineni@gmail.com"
               className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 transform hover:scale-110">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-cyan-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-center text-xl text-cyan-400 mb-16">Know Me More</p>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                As a fresher React.js developer, I have developed 2 projects using React.js and am passionate about building interactive and responsive web applications. My experience has given me a solid foundation in front-end development and an eagerness to learn new technologies.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                While I am just starting my journey in software development, my enthusiasm and dedication to honing my skills will allow me to contribute to any team effectively. I am confident that my understanding of React.js, along with my commitment to learning and growing as a developer, can bring value to your organization as I continue to develop my technical proficiency.
              </p>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 text-sm">
                    <div><strong>Name:</strong> Bhanu Teja Makkineni</div>
                    <div><strong>Email:</strong> bhanutejamakkineni@gmail.com</div>
                    <div><strong>Date of birth:</strong> 14 MARCH, 2004</div>
                    <div><strong>From:</strong> Hyderabad, India</div>
                  </div>
                  <div className="flex items-center gap-3 pt-4">
                    <Code className="w-6 h-6 text-cyan-400" />
                    <span className="text-lg font-bold text-cyan-400">2 Projects Completed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            What I Know
          </h2>
          <p className="text-center text-xl text-cyan-400 mb-16">Technologies I Know</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <Card key={skill.name} className="bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 group">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{skill.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                    {skill.name}
                  </h3>
                  <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden mb-2">
                    <div 
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out transform origin-left group-hover:scale-105`}
                      style={{
                        width: `${skill.level}%`,
                        animation: `slideIn 1s ease-out ${index * 0.1}s both`
                      }}
                    />
                  </div>
                  <span className="text-cyan-400 font-medium text-sm">{skill.level}%</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Portfolio
          </h2>
          <p className="text-center text-xl text-cyan-400 mb-16">Some of my most recent projects</p>
          
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={project.title} className="bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 group">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-cyan-400 mb-2">Key Features:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                      {project.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-400/30">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white">
                        <Github className="w-4 h-4 mr-2" />
                        View Code
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* LeetCode Section */}
      <section id="leetcode" className="py-20 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            LeetCode Profile
          </h2>
          <LeetCodeProfile />
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Resume
          </h2>
          <p className="text-center text-xl text-cyan-400 mb-16">A Summary of My Resume</p>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Education */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-cyan-400" />
                My Education
              </h3>
              <Card className="bg-white/5 backdrop-blur-lg border-white/10">
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold text-cyan-400 mb-2">Bachelor of Technology</h4>
                  <p className="text-blue-300 mb-2">JNTUH / 2022-2026</p>
                  <p className="text-gray-300">
                    Currently pursuing Bachelor of Technology in Malla Reddy College of Engineering and Technology 
                    affiliated to JNTUH from 2022 to 2026
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Projects Summary */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-cyan-400" />
                My Projects
              </h3>
              <div className="space-y-6">
                {projects.map((project, index) => (
                  <Card key={index} className="bg-white/5 backdrop-blur-lg border-white/10">
                    <CardContent className="p-6">
                      <h4 className="text-lg font-bold text-cyan-400 mb-2">{project.title}</h4>
                      <p className="text-gray-300 text-sm">{project.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105">
              <Download className="w-5 h-5 mr-2" />
              Download Resume
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <a 
              href="mailto:bhanutejamakkineni@gmail.com"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
            >
              <Mail className="w-5 h-5 mr-2" />
              Send Email
            </a>
            <a 
              href="https://www.linkedin.com/in/bhanu-teja-makkineni-a65310265" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white px-8 py-4 rounded-full transition-all duration-300 inline-flex items-center justify-center"
            >
              <Linkedin className="w-5 h-5 mr-2" />
              LinkedIn
            </a>
          </div>

          <div className="text-gray-300">
            <p className="mb-4">Follow me on social media</p>
            <div className="flex justify-center space-x-6">
              <a href="https://github.com/bhanuteja449896" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 transform hover:scale-110">
                <Github className="w-8 h-8" />
              </a>
              <a href="https://www.linkedin.com/in/bhanu-teja-makkineni-a65310265" target="_blank" rel="noopener noreferrer"
                 className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 transform hover:scale-110">
                <Linkedin className="w-8 h-8" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10 bg-black/30">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 Bhanu Teja Makkineni. Built with ❤️ using React & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
