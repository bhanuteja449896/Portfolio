import React, { useState, useEffect } from 'react';
import { ChevronDown, Github, Linkedin, Mail, ExternalLink, Code, User, Briefcase, Star, Download, Phone, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import LeetCodeProfile from '@/components/LeetCodeProfile';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest('.mobile-menu') && !target.closest('.menu-button')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    
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
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const skills = [
    { name: 'Java', level: 85, color: 'from-orange-400 to-red-500', icon: '☕' },
    { name: 'Spring Boot', level: 80, color: 'from-green-500 to-green-700', icon: '🍃' },
    { name: 'React.js', level: 88, color: 'from-cyan-400 to-blue-500', icon: '⚛️' },
    { name: 'JavaScript', level: 85, color: 'from-yellow-400 to-orange-500', icon: '⚡' },
    { name: 'MySQL', level: 82, color: 'from-blue-400 to-blue-600', icon: '🗃️' },
    { name: 'REST APIs', level: 85, color: 'from-purple-400 to-purple-600', icon: '🔌' },
    { name: 'Git', level: 80, color: 'from-gray-400 to-gray-600', icon: '🔄' },
    { name: 'MongoDB', level: 75, color: 'from-green-400 to-green-600', icon: '🍃' },
  ];

  const projects = [
    {
      title: 'Resume ATS Score',
      description: 'An innovative web application that analyzes resumes using AI to provide ATS (Applicant Tracking System) compatibility scores and suggestions for improvement. Built with Spring Boot backend integrating OpenAI API and a modern React.js frontend.',
      tech: ['Spring Boot', 'OpenAI API', 'React.js', 'Tailwind CSS', 'Java'],
      github: 'https://github.com/bhanuteja449896/resume-ats-score',
      features: [
        'AI-powered resume analysis using OpenAI integration',
        'Real-time ATS compatibility scoring',
        'Detailed improvement suggestions for resume optimization',
        'Modern UI with Tailwind CSS and React.js',
        'Secure API handling with Spring Boot'
      ]
    },
    {
      title: 'Wallet Payment System',
      description: 'A scalable payment processing platform supporting multiple independent merchant environments. Features include secure transaction processing, comprehensive user management, and detailed financial reporting capabilities.',
      tech: ['Spring Boot', 'React.js', 'Node.js', 'MongoDB', 'JWT'],
      github: 'https://github.com/bhanuteja449896/EventPaymentSystem',
      features: [
        'Multi-merchant environment support',
        'Secure transaction processing with Spring Security',
        'JWT-based authentication and authorization',
        'Interactive merchant dashboard with data visualization',
        'Real-time financial reporting and analytics'
      ]
    },
    {
      title: 'College Gatepass System',
      description: 'A digitalized college gatepass management system that streamlines the approval workflow between students and department heads. The system reduced processing time by 75% compared to the traditional paper-based system.',
      tech: ['Spring Boot', 'MongoDB', 'Spring Security'],
      github: 'https://github.com/bhanuteja449896/gatepass',
      features: [
        'Automated approval workflows',
        'Role-based access for department heads',
        'Real-time request tracking and notifications',
        'Secure data handling with Spring Security',
        '75% reduction in processing time'
      ]
    },
    {
      title: 'Clinic Management System',
      description: 'A high-performance clinic management solution handling 100+ daily appointments with secure online scheduling. Features include PCI-compliant payment processing, comprehensive patient management, and optimized performance for high concurrent usage.',
      tech: ['Spring Boot', 'React.js', 'MongoDB', 'Payment Gateway'],
      github: 'https://github.com/bhanuteja449896/clinic',
      features: [
        'High-traffic appointment scheduling system',
        'PCI-compliant payment processing (500+ monthly transactions)',
        'Secure patient records management',
        'Advanced admin portal with physician scheduling',
        'Optimized for 50+ concurrent users with 99.9% uptime'
      ]
    },
    {
      title: 'Class Archive',
      description: 'A full-stack educational resource management system enabling students to access and download lecture materials with role-based permissions. The system features secure file handling, real-time document management, and a responsive interface.',
      tech: ['Spring Boot', 'React.js', 'Node.js', 'MongoDB', 'JWT'],
      github: 'https://github.com/bhanuteja449896/ad1',
      features: [
        'Secure file upload/download with Spring Security & JWT',
        'Role-based access control for content management',
        'Real-time document preview and management',
        'Responsive React.js frontend with Material UI',
        'MongoDB integration for efficient data storage'
      ]
    }
  ];

  const handleDownloadResume = () => {
    // Create a link element
    const link = document.createElement('a');
    link.href = '/bhanutejamakkineni.pdf';
    link.download = 'bhanuteja_makkineni_resume.pdf'; // Name for the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white menu-button"
              >
                {isMobileMenuOpen ? '✕' : '☰'}
              </Button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-lg border-b border-white/10 p-4 mobile-menu">
              <div className="flex flex-col space-y-2">
                {['home', 'about', 'skills', 'projects', 'leetcode', 'resume', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      scrollToSection(item);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`px-4 py-3 rounded-md text-sm font-medium transition-all duration-300 capitalize ${
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
          )}
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
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                <img 
                  src="/profile_image.jpg" 
                  alt="Bhanu Teja Makkineni"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-lg text-gray-300 mb-2">Hi, I'm</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
              Bhanu Teja Makkineni
            </h1>
            <p className="text-xl md:text-2xl text-cyan-400 mb-2">Full Stack Developer</p>
            <p className="text-lg text-gray-300 mb-2">Spring Boot | React.js</p>
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
                As a Full Stack Developer, I specialize in building robust and scalable web applications using Spring Boot for backend development and React.js for creating dynamic user interfaces. My experience spans both server-side and client-side development, allowing me to deliver complete end-to-end solutions.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                I have a strong foundation in Java and modern JavaScript, with expertise in developing RESTful APIs, managing databases, and implementing responsive front-end designs. My projects demonstrate my ability to handle both backend logic and user experience, making me a versatile developer who can contribute to all aspects of application development.
              </p>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 text-sm">
                    <div><strong>Name:</strong> Bhanu Teja Makkineni</div>
                    <div><strong>Email:</strong> bhanutejamakkineni@gmail.com</div>
                    <div><strong>Role:</strong> Full Stack Developer</div>
                    <div><strong>Date of birth:</strong> 14 MARCH, 2004</div>
                    <div><strong>From:</strong> Hyderabad, India</div>
                  </div>
                  <div className="flex items-center gap-3 pt-4">
                    <Code className="w-6 h-6 text-cyan-400" />
                    <span className="text-lg font-bold text-cyan-400">Full Stack Projects</span>
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
                  {/* <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden mb-2">
                    <div 
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out transform origin-left group-hover:scale-105`}
                      style={{
                        width: `${skill.level}%`,
                        animation: `slideIn 1s ease-out ${index * 0.1}s both`
                      }}
                    />
                  </div> */}
                  {/* <span className="text-cyan-400 font-medium text-sm">{skill.level}%</span> */}
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
            <Button 
              onClick={handleDownloadResume}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
            >
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
