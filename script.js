// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Load JSON data and then populate the page
    fetch('resume.json') // Adjust the file path as necessary
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch portfolio data');
            }
            return response.json();
        })
        .then(data => {
            window.portfolioData = data; // Store fetched data globally for access in other functions
            populatePortfolio(); // Populate portfolio with the loaded data
        })
        .catch(error => {
            console.error('Error loading portfolio data:', error);
        });

    // Setup mobile navigation
    setupMobileNav();

    // Setup project filtering
    setupProjectFilters();
    setupProjectFilters();
    // Setup contact form submission
    setupContactForm();
});

// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get the theme toggle button
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or use default
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply the saved theme on page load
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update icon based on current theme
    updateThemeIcon(currentTheme);
    
    // Add click event to toggle theme
    themeToggle.addEventListener('click', function() {
        // Get the current theme
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        
        // Switch to the opposite theme
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Set the new theme
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // Save theme preference
        localStorage.setItem('theme', newTheme);
        
        // Update the icon
        updateThemeIcon(newTheme);
    });
    
    // Function to update icon based on theme
    function updateThemeIcon(theme) {
        // Remove all existing classes
        themeIcon.className = '';
        
        // Add appropriate icon class
        if (theme === 'dark') {
            themeIcon.classList.add('fas', 'fa-sun'); // Show sun icon in dark mode
        } else {
            themeIcon.classList.add('fas', 'fa-moon'); // Show moon icon in light mode
        }
    }
});
// Function to populate all sections with data
function populatePortfolio() {
    // Basic information
    document.getElementById('name').textContent = portfolioData.name;
    document.getElementById('career-objective').textContent = portfolioData.career_objective;

    // About section
    populateAboutSection();

    // Education section
    populateEducationSection();

    // Skills section
    populateSkillsSection();

    // Experience & Certifications section
    populateExperienceSection();

    // Projects section
    populateProjectsSection();

    // Achievements section
    populateAchievementsSection();

    // Contact section
    populateContactSection();
}

// Fix for project images so text doesn't overlap
function fixProjectImageText() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        const imageContainer = card.querySelector('.project-image');
        const titleText = card.querySelector('.project-content h3').textContent;

        // If the image fails to load, ensure text is not on top of placeholder
        const existingImg = imageContainer.querySelector('img');
        if (!existingImg) {
            const placeholderDiv = document.createElement('div');
            placeholderDiv.className = 'project-placeholder';
            placeholderDiv.textContent = titleText;

            // Clear any existing content and add placeholder
            imageContainer.innerHTML = '';
            imageContainer.appendChild(placeholderDiv);
        }
    });
}
// Populate About section
function populateAboutSection() {
    // About description - using career objective for now
    document.getElementById('about-description').textContent = portfolioData.career_objective;

    // Areas of interest
    const interestsContainer = document.getElementById('areas-of-interest');
    portfolioData.areas_of_interest.forEach(interest => {
        const li = document.createElement('li');
        li.textContent = interest;
        interestsContainer.appendChild(li);
    });

    // Languages
    const languagesContainer = document.getElementById('languages-list');
    for (const [language, level] of Object.entries(portfolioData.languages_known)) {
        const li = document.createElement('li');
        li.textContent = `${language} - ${level}`;
        languagesContainer.appendChild(li);
    }
}

// Populate Education section
function populateEducationSection() {
    const educationTimeline = document.getElementById('education-timeline');

    portfolioData.education.forEach((edu, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = `timeline-item ${index % 2 === 0 ? 'left' : 'right'}`;

        const content = document.createElement('div');
        content.className = 'timeline-content';

        content.innerHTML = `
            <h3>${edu.institution}</h3>
            <p>${edu.degree}</p>
            <p class="date">${edu.duration}</p>
            <p class="score">${edu.cgpa ? 'CGPA: ' + edu.cgpa : 'Percentage: ' + edu.percentage + '%'}</p>
        `;

        timelineItem.appendChild(content);
        educationTimeline.appendChild(timelineItem);
    });
}

// Populate Skills section
function populateSkillsSection() {
    // Programming Languages
    const programLangContainer = document.getElementById('programming-languages');
    portfolioData.skills.technical_skills.programming_languages.forEach(lang => {
        const li = document.createElement('li');
        li.textContent = lang;
        programLangContainer.appendChild(li);
    });

    // Data Analysis Tools
    const dataToolsContainer = document.getElementById('data-analysis-tools');
    portfolioData.skills.technical_skills.data_analysis_tools.forEach(tool => {
        const li = document.createElement('li');
        li.textContent = tool;
        dataToolsContainer.appendChild(li);
    });

    // Frameworks
    const frameworksContainer = document.getElementById('frameworks');
    portfolioData.skills.technical_skills.frameworks.forEach(framework => {
        const li = document.createElement('li');
        li.textContent = framework;
        frameworksContainer.appendChild(li);
    });

    // Front End
    const frontEndContainer = document.getElementById('front-end');
    portfolioData.skills.technical_skills.front_end.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        frontEndContainer.appendChild(li);
    });

    // Soft Skills
    const softSkillsContainer = document.getElementById('soft-skills');
    portfolioData.skills.soft_skills.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        softSkillsContainer.appendChild(li);
    });
}

// Populate Experience & Certifications section
function populateExperienceSection() {
    // Internships
    const internshipsContainer = document.getElementById('internships');
    portfolioData.internships_and_certifications.internships.forEach(internship => {
        const li = document.createElement('li');
        li.textContent = internship;
        internshipsContainer.appendChild(li);
    });

    // Certifications
    const certificationsContainer = document.getElementById('certifications-list');
    portfolioData.internships_and_certifications.certifications.forEach(cert => {
        const div = document.createElement('div');
        div.className = 'certification-card';

        div.innerHTML = `
            <h4>${cert.name}</h4>
            <p>Provider: ${cert.provider}</p>
            <a href="${cert.certificate_link}" target="_blank">View Certificate</a>
        `;

        certificationsContainer.appendChild(div);
    });
}

// Populate Projects section
function populateProjectsSection() {
    const projectsGrid = document.getElementById('projects-grid');
    
    portfolioData.projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = `project-card ${project.category}`;
        
        // Create image container
        const imageContainer = document.createElement('div');
        imageContainer.className = 'project-image';
        
        // Attempt to load the image, if it fails, use a placeholder
        if (project.image) {
            const img = new Image();
            img.src = project.image;
            img.alt = project.title;
            
            img.onload = function() {
                imageContainer.innerHTML = '';
                imageContainer.appendChild(img);
            };
            
            img.onerror = function() {
                const placeholderDiv = document.createElement('div');
                placeholderDiv.className = 'project-placeholder';
                placeholderDiv.textContent = project.title;
                imageContainer.innerHTML = '';
                imageContainer.appendChild(placeholderDiv);
            };
        } else {
            const placeholderDiv = document.createElement('div');
            placeholderDiv.className = 'project-placeholder';
            placeholderDiv.textContent = project.title;
            imageContainer.appendChild(placeholderDiv);
        }
        
        // Create content container and add other elements
        // ... rest of your existing code for project cards
        
        const projectContent = document.createElement('div');
        projectContent.className = 'project-content';
        
        // Create title
        const title = document.createElement('h3');
        title.textContent = project.title;
        
        // Create tags
        const tags = document.createElement('div');
        tags.className = 'project-tags';
        
        project.technologies.forEach(tech => {
            const tag = document.createElement('span');
            tag.className = 'project-tag';
            tag.textContent = tech;
            tags.appendChild(tag);
        });
        
        // Create description
        const description = document.createElement('p');
        description.className = 'project-description';
        description.textContent = project.description;
        
        // Create links
        const links = document.createElement('div');
        links.className = 'project-links';
        
        if (project.live_link) {
            const liveLink = document.createElement('a');
            liveLink.href = project.live_link;
            liveLink.target = '_blank';
            liveLink.textContent = 'Live Demo';
            links.appendChild(liveLink);
        }
        
        if (project.github_link) {
            const githubLink = document.createElement('a');
            githubLink.href = project.github_link;
            githubLink.target = '_blank';
            githubLink.textContent = 'GitHub';
            links.appendChild(githubLink);
        }
        
        // Assemble project card
        projectContent.appendChild(title);
        projectContent.appendChild(tags);
        projectContent.appendChild(description);
        projectContent.appendChild(links);
        
        projectCard.appendChild(imageContainer);
        projectCard.appendChild(projectContent);
        
        projectsGrid.appendChild(projectCard);
    });
}

// Populate Achievements section
function populateAchievementsSection() {
    const achievementsContainer = document.getElementById('achievements-list');

    portfolioData.achievements.forEach(achievement => {
        const achievementCard = document.createElement('div');
        achievementCard.className = 'achievement-card';

        achievementCard.innerHTML = `
            <h3>${achievement.title}</h3>
            <p class="achievement-date">${achievement.date}</p>
            <p>${achievement.description}</p>
        `;

        achievementsContainer.appendChild(achievementCard);
    });
}

// Populate Contact section
function populateContactSection() {
    const emailContainer = document.getElementById('email');
    emailContainer.innerHTML = ''; 

    portfolioData.contact.email.forEach(email => {
        const emailLink = document.createElement('a');  
        emailLink.href = `mailto:${email}`;       
        emailLink.target = '_blank';                 
    
        const emailElement = document.createElement('div');  
        emailElement.textContent = email;                   
    
        emailLink.appendChild(emailElement);           
        emailContainer.appendChild(emailLink);          
    });
    document.getElementById('phone').textContent = portfolioData.contact.phone;
    document.getElementById('phone').href = `tel:${portfolioData.contact.phone}`;
    const LocationContainer = document.getElementById('location');
    LocationContainer.innerHTML = ''; 

    portfolioData.contact.location.forEach(location => {
        const Locationelement = document.createElement('div');
        Locationelement.textContent = location;
        LocationContainer.appendChild(Locationelement);
    });
}
// Section Visibility
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Scroll Progress Indicator
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('scroll-progress').style.width = scrolled + '%';
});
// Setup mobile navigation
function setupMobileNav() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');

            navLinks.forEach(link => {
                link.style.animation = '';
            });
        });
    });
}

// Setup project filtering
function setupProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            // Show all projects if 'all' is selected, otherwise filter
            projectCards.forEach(card => {
                if (filter === 'all' || card.classList.contains(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

function setupContactForm() {
    emailjs.init('SeiocMNDYLnBDIwZ-'); // Initialize EmailJS with your user ID

    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name-input').value;
        const email = document.getElementById('email-input').value;
        const subject = document.getElementById('subject-input').value;
        const message = document.getElementById('message-input').value;
        const templateParams = {
            name,
            email,
            subject,
            message,
        };
        emailjs
            .send('service_6qku0is', 'template_ojcvxa9', templateParams)
            .then(
                function (response) {
                    console.log('SUCCESS!', response.status, response.text);
                    alert('Your message has been sent!');
                    contactForm.reset();
                },
                function (error) {
                    console.log('FAILED...', error);
                    alert('Failed to send the message. Please try again later.');
                }
            );
    });
}
