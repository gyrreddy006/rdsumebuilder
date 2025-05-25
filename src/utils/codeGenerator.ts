import { UserData, TemplateData } from '../context/PortfolioContext';

// Generate HTML, CSS, and JS code based on the user data and selected template
export const generatePortfolioCode = (userData: UserData, template: TemplateData) => {
  // Generate different code based on the selected template
  const templateStyles = getTemplateStyles(template.id);
  
  // Generate HTML
  const html = generateHTML(userData, template);
  
  // Generate CSS
  const css = generateCSS(template, templateStyles);
  
  // Generate JavaScript
  const js = generateJS();
  
  return {
    html,
    css,
    js
  };
};

const getTemplateStyles = (templateId: string) => {
  const templates = {
    minimal: {
      primaryColor: '#3B82F6',
      secondaryColor: '#1E40AF',
      fontFamily: "'Inter', sans-serif",
      borderRadius: '4px'
    },
    creative: {
      primaryColor: '#EC4899',
      secondaryColor: '#BE185D',
      fontFamily: "'Poppins', sans-serif",
      borderRadius: '12px'
    },
    professional: {
      primaryColor: '#1F2937',
      secondaryColor: '#111827',
      fontFamily: "'Source Sans Pro', sans-serif",
      borderRadius: '6px'
    },
    developer: {
      primaryColor: '#10B981',
      secondaryColor: '#059669',
      fontFamily: "'JetBrains Mono', monospace",
      borderRadius: '8px'
    },
    modern: {
      primaryColor: '#8B5CF6',
      secondaryColor: '#6D28D9',
      fontFamily: "'DM Sans', sans-serif",
      borderRadius: '16px'
    },
    academic: {
      primaryColor: '#4B5563',
      secondaryColor: '#374151',
      fontFamily: "'Merriweather', serif",
      borderRadius: '4px'
    }
  };

  return templates[templateId as keyof typeof templates] || templates.minimal;
};

const generateHTML = (userData: UserData, template: TemplateData) => {
  const { name, title, about, email, phone, location, linkedin, github, skills, experiences, education, projects } = userData;
  
  // Generate skills HTML
  const skillsHTML = skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('\n      ');
  
  // Generate experiences HTML
  const experiencesHTML = experiences.map(exp => `
    <div class="experience-item">
      <div class="experience-header">
        <h3>${exp.position}</h3>
        <p class="company">${exp.company}</p>
        <p class="date">${formatDate(exp.startDate)} - ${exp.endDate || 'Present'}</p>
      </div>
      <p class="description">${exp.description}</p>
    </div>
  `).join('\n');
  
  // Generate education HTML
  const educationHTML = education.map(edu => `
    <div class="education-item">
      <h3>${edu.degree} in ${edu.field}</h3>
      <p class="institution">${edu.institution}</p>
      <p class="date">${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}</p>
    </div>
  `).join('\n');
  
  // Generate projects HTML
  const projectsHTML = projects.map(project => `
    <div class="project-item">
      ${project.image ? `<img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy">` : ''}
      <div class="project-content">
        <h3>${project.title}</h3>
        <p class="description">${project.description}</p>
        <div class="technologies">
          ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('\n          ')}
        </div>
        ${project.link ? `<a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-link">View Project</a>` : ''}
      </div>
    </div>
  `).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name || 'Portfolio'} - ${title || 'Professional Portfolio'}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&family=Poppins:wght@400;500;600;700&family=Source+Sans+Pro:wght@400;600;700&family=DM+Sans:wght@400;500;700&family=Merriweather:wght@400;700&display=swap" rel="stylesheet">
</head>
<body>
  <header id="home">
    <div class="header-content">
      <h1>${name || 'Your Name'}</h1>
      <p class="title">${title || 'Your Title'}</p>
      <div class="social-links">
        ${email ? `<a href="mailto:${email}" class="social-link email">Email</a>` : ''}
        ${linkedin ? `<a href="${linkedin}" target="_blank" rel="noopener noreferrer" class="social-link linkedin">LinkedIn</a>` : ''}
        ${github ? `<a href="${github}" target="_blank" rel="noopener noreferrer" class="social-link github">GitHub</a>` : ''}
      </div>
    </div>
  </header>

  <nav id="navbar">
    <div class="container">
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#experience">Experience</a>
      <a href="#projects">Projects</a>
      <a href="#contact">Contact</a>
    </div>
  </nav>

  <section id="about" class="section">
    <div class="container">
      <h2 class="section-title">About Me</h2>
      <div class="about-content">
        <div class="about-text">
          <p>${about || 'Write something about yourself here.'}</p>
        </div>
        <div class="skills">
          <h3>Skills</h3>
          <div class="skills-container">
            ${skillsHTML}
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="experience" class="section">
    <div class="container">
      <h2 class="section-title">Experience</h2>
      <div class="experience-container">
        ${experiencesHTML || '<p>No experience added yet.</p>'}
      </div>
      
      <h2 class="section-title">Education</h2>
      <div class="education-container">
        ${educationHTML || '<p>No education added yet.</p>'}
      </div>
    </div>
  </section>

  <section id="projects" class="section">
    <div class="container">
      <h2 class="section-title">Projects</h2>
      <div class="projects-container">
        ${projectsHTML || '<p>No projects added yet.</p>'}
      </div>
    </div>
  </section>

  <section id="contact" class="section">
    <div class="container">
      <h2 class="section-title">Contact</h2>
      <div class="contact-content">
        <p>Get in touch with me through any of the following methods:</p>
        <div class="contact-info">
          ${email ? `<div class="contact-item"><span class="label">Email:</span> <a href="mailto:${email}">${email}</a></div>` : ''}
          ${phone ? `<div class="contact-item"><span class="label">Phone:</span> ${phone}</div>` : ''}
          ${location ? `<div class="contact-item"><span class="label">Location:</span> ${location}</div>` : ''}
        </div>
      </div>
    </div>
  </section>

  <footer>
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} ${name || 'Your Name'}. All rights reserved.</p>
    </div>
  </footer>
</body>
</html>`;
};

const generateCSS = (template: TemplateData, styles: any) => {
  return `:root {
  --primary-color: ${styles.primaryColor};
  --secondary-color: ${styles.secondaryColor};
  --accent-color: #F59E0B;
  --text-color: #1F2937;
  --light-text-color: #6B7280;
  --background-color: #F9FAFB;
  --white: #FFFFFF;
  --gray-100: #F3F4F6;
  --gray-200: #E5E7EB;
  --gray-300: #D1D5DB;
  --gray-800: #1F2937;
  --border-radius: ${styles.borderRadius};
  --transition: all 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: ${styles.fontFamily};
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--background-color);
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

a {
  color: var(--primary-color);
  text-decoration: none;
  transition: var(--transition);
}

a:hover {
  color: var(--secondary-color);
}

/* Header */
header {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: var(--white);
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.header-content {
  max-width: 800px;
  position: relative;
  z-index: 1;
}

header h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards;
}

header .title {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0;
  animation: fadeInUp 0.8s ease 0.2s forwards;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  opacity: 0;
  animation: fadeInUp 0.8s ease 0.4s forwards;
}

.social-link {
  padding: 0.6rem 1.2rem;
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--white);
  border-radius: 30px;
  transition: var(--transition);
  backdrop-filter: blur(5px);
}

.social-link:hover {
  background-color: rgba(255, 255, 255, 0.2);
  color: var(--white);
  transform: translateY(-2px);
}

/* Navigation */
#navbar {
  position: sticky;
  top: 0;
  background-color: var(--white);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  padding: 1rem 0;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.9);
}

#navbar .container {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

#navbar a {
  color: var(--gray-800);
  font-weight: 500;
  transition: var(--transition);
  position: relative;
}

#navbar a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--primary-color);
  transition: var(--transition);
}

#navbar a:hover::after,
#navbar a.active::after {
  width: 100%;
}

/* Sections */
.section {
  padding: 5rem 0;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.section.visible {
  opacity: 1;
  transform: translateY(0);
}

.section-title {
  font-size: 2rem;
  margin-bottom: 2.5rem;
  text-align: center;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background-color: var(--primary-color);
  border-radius: 2px;
}

/* About Section */
.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.about-text p {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  line-height: 1.8;
}

.skills h3 {
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.skills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.skill-tag {
  background-color: var(--primary-color);
  color: var(--white);
  padding: 0.5rem 1rem;
  border-radius: 30px;
  font-size: 0.9rem;
  transition: var(--transition);
}

.skill-tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Experience Section */
.experience-container,
.education-container {
  margin-bottom: 3rem;
}

.experience-item,
.education-item {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--gray-200);
  transition: var(--transition);
}

.experience-item:hover,
.education-item:hover {
  transform: translateX(10px);
}

.experience-item:last-child,
.education-item:last-child {
  border-bottom: none;
}

.experience-header {
  margin-bottom: 1rem;
}

.experience-header h3,
.education-item h3 {
  font-size: 1.3rem;
  margin-bottom: 0.3rem;
  color: var(--primary-color);
}

.company,
.institution {
  font-weight: 500;
  color: var(--secondary-color);
}

.date {
  color: var(--light-text-color);
  font-size: 0.9rem;
  margin-top: 0.3rem;
}

/* Projects Section */
.projects-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.project-item {
  background-color: var(--white);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: var(--transition);
}

.project-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.project-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: var(--transition);
}

.project-item:hover .project-image {
  transform: scale(1.05);
}

.project-content {
  padding: 1.5rem;
}

.project-content h3 {
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
  color: var(--primary-color);
}

.technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
}

.tech-tag {
  background-color: var(--gray-100);
  color: var(--gray-800);
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
  transition: var(--transition);
}

.tech-tag:hover {
  background-color: var(--primary-color);
  color: var(--white);
}

.project-link {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: var(--primary-color);
  color: var(--white);
  border-radius: 4px;
  font-weight: 500;
  transition: var(--transition);
}

.project-link:hover {
  background-color: var(--secondary-color);
  color: var(--white);
  transform: translateY(-2px);
}

/* Contact Section */
.contact-content {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.contact-content p {
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  background-color: var(--white);
  border-radius: var(--border-radius);
  transition: var(--transition);
}

.contact-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.label {
  font-weight: 600;
  color: var(--primary-color);
}

/* Footer */
footer {
  background-color: var(--gray-800);
  color: var(--white);
  padding: 2rem 0;
  text-align: center;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Media Queries */
@media screen and (max-width: 768px) {
  header h1 {
    font-size: 2.5rem;
  }
  
  header .title {
    font-size: 1.2rem;
  }
  
  .about-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  #navbar .container {
    overflow-x: auto;
    justify-content: flex-start;
    padding-bottom: 0.5rem;
  }
  
  .section {
    padding: 3rem 0;
  }
}

@media screen and (max-width: 480px) {
  header h1 {
    font-size: 2rem;
  }
  
  .projects-container {
    grid-template-columns: 1fr;
  }
  
  .social-links {
    flex-direction: column;
    align-items: center;
  }
  
  .social-link {
    width: 100%;
    max-width: 200px;
  }
}`;
};

const generateJS = () => {
  return `// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 60,
        behavior: 'smooth'
      });
    }
  });
});

// Intersection Observer for section animations
const sections = document.querySelectorAll('.section');
const observerOptions = {
  root: null,
  threshold: 0.1,
  rootMargin: '-50px'
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

sections.forEach(section => {
  sectionObserver.observe(section);
});

// Highlight active navigation item based on scroll position
const navLinks = document.querySelectorAll('nav a');

const updateActiveNavLink = () => {
  const fromTop = window.scrollY + 70;

  navLinks.forEach(link => {
    const section = document.querySelector(link.hash);
    
    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
};

window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// Add dynamic background particles
const createParticles = () => {
  const header = document.querySelector('header');
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles';
  particlesContainer.style.cssText = \`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 0;
  \`;
  
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = \`
      position: absolute;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      pointer-events: none;
      transform: scale(0);
      animation: particle 3s infinite;
      animation-delay: \${Math.random() * 3}s;
    \`;
    
    const size = Math.random() * 10 + 5;
    particle.style.width = \`\${size}px\`;
    particle.style.height = \`\${size}px\`;
    particle.style.left = \`\${Math.random() * 100}%\`;
    particle.style.top = \`\${Math.random() * 100}%\`;
    
    particlesContainer.appendChild(particle);
  }
  
  header.appendChild(particlesContainer);
};

// Add particle animation styles
const style = document.createElement('style');
style.textContent = \`
  @keyframes particle {
    0% {
      transform: scale(0) translate(0, 0);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: scale(1) translate(100px, -100px);
      opacity: 0;
    }
  }
\`;
document.head.appendChild(style);

// Initialize particles on load
window.addEventListener('load', createParticles);

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  console.log('Portfolio loaded successfully!');
});`;
};

// Helper function to format dates
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  
  try {
    const [year, month] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  } catch (error) {
    return dateString;
  }
};