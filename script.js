// Main application
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Initialize typewriter effect for subtitle
    initTypewriter();
    
    // Load JSON data from external file
    loadResumeData();
});

// Typewriter effect for hero subtitle
function initTypewriter() {
    const subtitleElement = document.getElementById('hero-subtitle');
    
    // Set a default subtitle that will be replaced by data
    subtitleElement.textContent = '// Loading portfolio data...';
}

// Function to load resume data from data.json
async function loadResumeData() {
    try {
        // Show loading state
        document.getElementById('hero-subtitle').textContent = '// Fetching data...';
        
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const resumeData = await response.json();
        populateResume(resumeData);
        
        // Initialize animations after content loads
        initAnimations();
        
    } catch (error) {
        console.error('Error loading resume data:', error);
        showErrorMessage(error);
    }
}

// Function to populate the resume with data
function populateResume(data) {
    // Set hero section with typewriter effect
    const nameElement = document.getElementById('hero-name');
    const firstName = data.full_name.split(' ')[0];
    nameElement.innerHTML = `<span>${firstName}</span>_PORTFOLIO`;
    
    // Update footer name
    document.getElementById('footer-name').textContent = data.full_name.toUpperCase();
    
    // Update subtitle with typewriter effect
    const subtitle = data.professional_summary.split('.')[0] + '.';
    typeWriterEffect('hero-subtitle', `// ${subtitle}`, 50);
    
    // Populate contact info
    const contactInfo = document.getElementById('contact-info');
    contactInfo.innerHTML = '';
    
    if (data.email) {
        const emailItem = createContactItem('envelope', data.email, 'fas fa-envelope');
        contactInfo.appendChild(emailItem);
    }
    
    if (data.phone) {
        const phoneItem = createContactItem('phone', data.phone, 'fas fa-phone');
        contactInfo.appendChild(phoneItem);
    }
    
    // Populate professional summary
    document.getElementById('professional-summary').textContent = data.professional_summary;
    
    // Populate skills
    const skillsList = document.getElementById('skills-list');
    skillsList.innerHTML = '';
    data.skills.forEach(skill => {
        const skillElement = document.createElement('div');
        skillElement.className = 'skill-tag';
        skillElement.textContent = skill;
        skillsList.appendChild(skillElement);
    });
    
    // Populate education
    const educationList = document.getElementById('education-list');
    educationList.innerHTML = '';
    data.education.forEach((edu, index) => {
        const eduElement = document.createElement('div');
        eduElement.className = 'education-item';
        eduElement.innerHTML = `
            <div class="education-line">
                <span class="edu-degree">${edu.degree}</span>
                <span class="edu-year">[${edu.year}]</span>
            </div>
            <div class="edu-institution">${edu.institution}</div>
        `;
        educationList.appendChild(eduElement);
    });
    
    // Add CSS for education items
    const educationStyle = document.createElement('style');
    educationStyle.textContent = `
        .education-item {
            margin-bottom: 1rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .education-item:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }
        
        .education-line {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.5rem;
        }
        
        .edu-degree {
            color: var(--light);
            font-weight: 300;
            font-size: 0.9rem;
        }
        
        .edu-year {
            color: var(--primary);
            font-size: 0.8rem;
            font-family: 'Roboto Mono', monospace;
        }
        
        .edu-institution {
            color: var(--gray);
            font-size: 0.85rem;
            font-weight: 300;
        }
    `;
    document.head.appendChild(educationStyle);
    
    // Populate certifications
    const certificationsList = document.getElementById('certifications-list');
    certificationsList.innerHTML = '';
    data.certifications.forEach(cert => {
        const certElement = document.createElement('div');
        certElement.className = 'certification-item';
        certElement.innerHTML = `
            <div class="cert-line">
                <span class="cert-name">${cert.name}</span>
                <span class="cert-badge">[✓]</span>
            </div>
        `;
        certificationsList.appendChild(certElement);
    });
    
    // Add CSS for certification items
    const certStyle = document.createElement('style');
    certStyle.textContent = `
        .certification-item {
            margin-bottom: 0.75rem;
        }
        
        .cert-line {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .cert-name {
            color: var(--gray);
            font-size: 0.9rem;
            font-weight: 300;
        }
        
        .cert-badge {
            color: var(--primary);
            font-size: 0.8rem;
            font-family: 'Roboto Mono', monospace;
        }
    `;
    document.head.appendChild(certStyle);
    
    // Populate languages
    const languagesList = document.getElementById('languages-list');
    languagesList.innerHTML = '';
    data.languages.forEach(lang => {
        const langElement = document.createElement('div');
        langElement.className = 'language-item';
        langElement.innerHTML = `
            <div class="lang-line">
                <span class="lang-name">${lang}</span>
                <span class="lang-level">[PRO]</span>
            </div>
        `;
        languagesList.appendChild(langElement);
    });
    
    // Add CSS for language items
    const langStyle = document.createElement('style');
    langStyle.textContent = `
        .language-item {
            margin-bottom: 0.75rem;
        }
        
        .lang-line {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .lang-name {
            color: var(--gray);
            font-size: 0.9rem;
            font-weight: 300;
        }
        
        .lang-level {
            color: var(--secondary);
            font-size: 0.8rem;
            font-family: 'Roboto Mono', monospace;
        }
    `;
    document.head.appendChild(langStyle);
    
    // Populate experience timeline
    const experienceTimeline = document.getElementById('experience-timeline');
    experienceTimeline.innerHTML = '';
    data.experience.forEach(exp => {
        const expElement = document.createElement('div');
        expElement.className = 'timeline-item';
        expElement.innerHTML = `
            <div class="timeline-header">
                <h3 class="timeline-title">${exp.position}</h3>
                <p class="timeline-subtitle">${exp.company}</p>
                <span class="timeline-duration">${exp.duration}</span>
            </div>
            <p class="timeline-description">${exp.description}</p>
        `;
        experienceTimeline.appendChild(expElement);
    });
    
    // Populate projects grid
    const projectsGrid = document.getElementById('projects-grid');
    projectsGrid.innerHTML = '';
    data.projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'project-card';
        
        projectElement.innerHTML = `
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-technologies">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
        `;
        projectsGrid.appendChild(projectElement);
    });
    
    // Populate social links
    const socialLinks = document.getElementById('social-links');
    socialLinks.innerHTML = '';
    const socialData = data.social_links;
    
    // Map social platforms to icons and colors
    const socialConfig = {
        linkedin: { icon: 'fab fa-linkedin-in', color: '#00D4FF' },
        github: { icon: 'fab fa-github', color: '#FFFFFF' },
        leetcode: { icon: 'fas fa-code', color: '#FFA500' },
        twitter: { icon: 'fab fa-twitter', color: '#00D4FF' },
        portfolio: { icon: 'fas fa-globe', color: '#00FF88' },
        medium: { icon: 'fab fa-medium', color: '#FFFFFF' },
        dev: { icon: 'fab fa-dev', color: '#FFFFFF' },
        stackoverflow: { icon: 'fab fa-stack-overflow', color: '#FF00E4' },
        codepen: { icon: 'fab fa-codepen', color: '#00FF88' }
    };
    
    // Add known social links
    Object.entries(socialConfig).forEach(([platform, config]) => {
        if (socialData[platform]) {
            const link = createSocialLink(platform, config.icon, socialData[platform], config.color);
            socialLinks.appendChild(link);
        }
    });
    
    // Add other links
    if (socialData.other_links && socialData.other_links.length > 0) {
        socialData.other_links.forEach(link => {
            const otherLink = createSocialLink('other', 'fas fa-external-link-alt', link.url, '#888888', link.name);
            socialLinks.appendChild(otherLink);
        });
    }
}

// Helper function to create contact items
function createContactItem(type, value, iconClass) {
    const item = document.createElement('div');
    item.className = 'contact-item';
    item.innerHTML = `
        <i class="${iconClass}"></i>
        <span>${value}</span>
    `;
    return item;
}

// Typewriter effect function
function typeWriterEffect(elementId, text, speed = 50) {
    const element = document.getElementById(elementId);
    element.innerHTML = '';
    
    let i = 0;
    element.classList.remove('blink');
    
    function typeChar() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeChar, speed);
        } else {
            element.classList.add('blink');
        }
    }
    
    typeChar();
}

// Helper function to create social links
function createSocialLink(platform, iconClass, url, color = '#888888', title = '') {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'social-link';
    link.title = title || platform;
    link.innerHTML = `<i class="${iconClass}"></i>`;
    link.style.color = color;
    link.addEventListener('mouseenter', () => link.style.color = '#00FF88');
    link.addEventListener('mouseleave', () => link.style.color = color);
    return link;
}

// Initialize animations
function initAnimations() {
    // Add staggered fade-in to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('fade-in');
    });
    
    // Add staggered animation to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
        card.classList.add('fade-in');
    });
    
    // Add hover effects to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateX(5px)';
        });
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateX(0)';
        });
    });
}

// Add fade-in animation
const fadeStyle = document.createElement('style');
fadeStyle.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .fade-in {
        animation: fadeIn 0.5s ease-out forwards;
        opacity: 0;
    }
`;
document.head.appendChild(fadeStyle);

// Function to show error message
function showErrorMessage(error) {
    const hero = document.querySelector('.hero');
    hero.innerHTML = `
        <div class="container">
            <h1>
                <span>ERROR</span>_LOADING
            </h1>
            <p class="subtitle terminal-line">
                // Failed to load portfolio data
            </p>
            <div class="contact-info">
                <div class="contact-item">
                    <i class="fas fa-exclamation-triangle"></i>
                    <span>Check console for details</span>
                </div>
                <div class="contact-item" onclick="location.reload()" style="cursor: pointer;">
                    <i class="fas fa-redo"></i>
                    <span>Click to retry</span>
                </div>
            </div>
        </div>
    `;
    
    console.error('Portfolio data loading error:', error);
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Terminal-like typing for summary
function initTerminalEffects() {
    const summaryElement = document.getElementById('professional-summary');
    if (summaryElement) {
        const text = summaryElement.textContent;
        summaryElement.textContent = '';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                summaryElement.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 20);
    }
}

// Initialize terminal effects when data is loaded
window.addEventListener('load', initTerminalEffects);