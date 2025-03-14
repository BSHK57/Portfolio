// Fetch and Display Resume Data
fetch('resume.json')
    .then(response => response.json())
    .then(data => {
        document.querySelector('.hero-content h1').innerHTML = `Hi, I'm <span class="gradient-text">${data.name}</span>`;
        document.querySelector('.hero-content p').textContent = "Aspiring Data Scientist & AI Engineer";

        // Update About Section
        document.querySelector('.about-text p').textContent = `I'm a passionate developer with expertise in ${data.areas_of_interest.join(", ")}.`;

        const skillsContainer = document.querySelector('.skills');
        skillsContainer.innerHTML = '';

        const technicalSkills = data.skills.technical_skills;

        Object.entries(technicalSkills).forEach(([category, skills]) => {
            if (Array.isArray(skills)) {
                let categoryContainer = document.createElement('div'); // Create a container for each category
                categoryContainer.classList.add('skill-category');

                let categoryTitle = document.createElement('strong'); // Bold category title
                categoryTitle.textContent = category.replace(/_/g, ' ').toUpperCase() + ': ';
                categoryContainer.appendChild(categoryTitle);

                skills.forEach(skill => {
                    let skillItem = document.createElement('div');
                    skillItem.classList.add('skill-item');
                    skillItem.textContent = skill;
                    categoryContainer.appendChild(skillItem);
                });

                skillsContainer.appendChild(categoryContainer); // Append category to the main container
            }
        });

        // Update Certifications
        const certificationsContainer = document.querySelector('.certification-list');
        certificationsContainer.innerHTML = '';

        data.internships_and_certifications.certifications.forEach(cert => {
            let certItem = document.createElement('div');
            certItem.classList.add('certification-item');

            certItem.innerHTML = `
        <h3>${cert.name}</h3>
        <p><strong>Provider:</strong> ${cert.provider}</p>
        <a href="${cert.certificate_link}" class="btn small" target="_blank">View Certificate</a>
    `;

            certificationsContainer.appendChild(certItem);
        });


        // Update Projects
        const projectsContainer = document.querySelector('.project-grid');
        projectsContainer.innerHTML = '';
        data.projects.forEach(project => {
            let projectCard = document.createElement('div');
            projectCard.classList.add('project-card');
            projectCard.innerHTML = `
                <div class="project-image" style="background-image: url('${project.image}')"></div>
                <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                ${project.github_link ? `<div class="project-links">
                    <a href="${project.github_link}" class="btn small" target="_blank">View Live</a>
                    <a href="${project.github_link}" class="btn small" target="_blank">Source Code</a>
                </div></div>` : ''}
            `;
            projectsContainer.appendChild(projectCard);
        });
        const achievementsContainer = document.querySelector('.achievement-list');
            achievementsContainer.innerHTML = '';

            data.achievements.forEach(achievement => {
                let achievementItem = document.createElement('div');
                achievementItem.classList.add('achievement-item');

                achievementItem.innerHTML = `
                    <h3>${achievement.title}</h3>
                    <p>${achievement.description}</p>
                    <span class="achievement-date">${achievement.date}</span>
                `;

                achievementsContainer.appendChild(achievementItem);
            });
    })
    .catch(error => console.error('Error loading resume data:', error));
    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("contact-form").addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent the form from actually submitting
    
            // Get input values
            let name = document.getElementById("name").value.trim();
            let email = document.getElementById("email").value.trim();
            let message = document.getElementById("message").value.trim();
    
            if (name === "" || email === "" || message === "") {
                alert("Please fill in all fields before sending.");
                return;
            }
    
            // Format the email body
            let mailBody = `Name: ${name}%0D%0A%0D%0A${message}`;
    
            // Open the default mail client with prefilled details
            let mailtoLink = `mailto:saiharikrishnabiyyapu@gmail.com?subject=Contact from ${name}&body=${mailBody}`;
            window.location.href = mailtoLink;
        });
    });
    