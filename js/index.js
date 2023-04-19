const today = new Date();
const thisYear = today.getFullYear();

const footer = document.querySelector("footer");
const copyright = document.createElement("p");

copyright.innerHTML = `Olga Adams &copy ${thisYear}`;
footer.appendChild(copyright);

const skills = [
                "HTML",     
                "CSS",
                "JavaScript",
                "Git",
                "Github",
                "MySQL",
                "Cypress",
];   

const skillsSection = document.getElementById('skills');
const skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++) {

    let skill = document.createElement("li");
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
}

   const messageForm = document.forms.leave_message;

   messageForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const usersName = event.target.usersName.value;
    const usersEmail = event.target.usersEmail.value;
    const usersMessage = event.target.usersMessage.value;

    const messageSection = document.getElementById('messages');
    const messageList = messageSection.querySelector('ul');
    const newMessage = document.createElement('li');

    newMessage.innerHTML = `
    <a href="mailto:${usersEmail}">${usersName}</a>
    <span>says: ${usersMessage}</span>
`;

    const removeButton = document.createElement('button');
    removeButton.innerText = 'remove';
    removeButton.type = 'button';

    removeButton.addEventListener("click", (event) => {
        const entry = event.target.parentNode;
        entry.remove();
    })

    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);

    messageForm.reset();
});

const dateFixer = (date) => {
    return date.slice(0, 10);
}


fetch("https://api.github.com/users/Olga975/repos")
.then((response) => response.json())
.then((data) => {
  const projectsSection = document.getElementById('projects');
  const projectsList = projectsSection.querySelector('ul');
  
  for (let i = 0; i < data.length; i++) {
    const project = document.createElement('li');
    const name = document.createElement('h3');
    const description = document.createElement('p');
    const updatedAt = document.createElement('p');
    
    name.innerHTML = `<a href="${data[i].html_url}" target="_blank">${data[i].name}</a>`;
    description.innerText = data[i].description;
    updatedAt.innerText = `Updated at: ${dateFixer(data[i].updated_at)}`;
    
    project.appendChild(name);
    project.appendChild(description);
    project.appendChild(updatedAt);
    projectsList.appendChild(project);
  }
})
.catch((error) => console.log(error));
