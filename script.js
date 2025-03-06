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
        data.skills.technical_skills.programming_languages.forEach(skill => {
            let skillItem = document.createElement('div');
            skillItem.classList.add('skill-item');
            skillItem.textContent = skill;
            skillsContainer.appendChild(skillItem);
        });
        
        // Update Projects
        const projectsContainer = document.querySelector('.project-grid');
        projectsContainer.innerHTML = '';
        data.projects.forEach(project => {
            let projectCard = document.createElement('div');
            projectCard.classList.add('project-card');
            projectCard.innerHTML = `
                <div class="project-image" style="background-image: url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80')"></div>
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
    })
    .catch(error => console.error('Error loading resume data:', error));