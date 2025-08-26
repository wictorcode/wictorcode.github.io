import { initBackground } from "./background.js";

initBackground()



const imageMap = {
    languages: "https://skillicons.dev/icons?i=py,html,css,js,ts,c,cpp,lua,kotlin,php,java&perline=8",
    frameworks: "https://skillicons.dev/icons?i=angular,vue,symfony,nestjs,spring,threejs,tailwind,express,nodejs&perline=8",
    databases: "https://skillicons.dev/icons?i=sqlite,mysql,mongodb,prisma&perline=8",
    tools: "https://skillicons.dev/icons?i=vscode,visualstudio,vite,git,docker,wordpress&perline=8"
};

const buttons = document.querySelectorAll(".ongletZone button");
const image = document.getElementById("competenceImage");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const type = button.getAttribute("data-type");
        image.src = imageMap[type];
    });
});