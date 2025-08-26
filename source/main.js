import { initBackground } from "./background.js";

initBackground()



const skillMap = {
    languages: ["py","html","css","js","ts","c","cpp","lua","kotlin","php","java"],
    frameworks: ["angular","vue","symfony","nestjs","spring","threejs","tailwind","express","nodejs"],
    databases: ["sqlite","mysql","mongodb","prisma"],
    tools: ["vscode","visualstudio","vite","git","docker","wordpress"]
};

const skillNames = {
    py: "Python",
    html: "HTML5",
    css: "CSS3",
    js: "JavaScript",
    ts: "TypeScript",
    c: "C",
    cpp: "C++",
    lua: "Lua",
    kotlin: "Kotlin",
    php: "PHP",
    java: "Java",
    angular: "Angular",
    vue: "Vue.js",
    symfony: "Symfony",
    nestjs: "NestJS",
    spring: "Spring Boot",
    threejs: "Three.js",
    tailwind: "Tailwind CSS",
    express: "Express.js",
    nodejs: "Node.js",
    sqlite: "SQLite",
    mysql: "MySQL",
    mongodb: "MongoDB",
    prisma: "Prisma",
    vscode: "VS Code",
    visualstudio: "Visual Studio",
    vite: "Vite",
    git: "Git",
    docker: "Docker",
    wordpress: "WordPress"
};

const buttons = document.querySelectorAll(".ongletZone button");
const container = document.getElementById("competenceContainer");

function loadSkills(type) {
    const skills = skillMap[type];
    container.innerHTML = "";
    skills.forEach(skill => {
        const wrapper = document.createElement("div");
        wrapper.className = "skill-icon";

        const img = document.createElement("img");
        img.src = `https://skillicons.dev/icons?i=${skill}`;
        img.alt = skill;

        const tooltip = document.createElement("div");
        tooltip.className = "tooltip";
        tooltip.textContent = skillNames[skill] || skill;

        wrapper.appendChild(img);
        wrapper.appendChild(tooltip);
        container.appendChild(wrapper);
    });
}

// load default
loadSkills("languages");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const type = button.getAttribute("data-type");
        loadSkills(type);
    });
});
