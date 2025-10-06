import projects from "../data/projects.json" with { type: "json" }
import { openProjectPopup } from "./popup.js";

const CONFIG = {
    COLUMNS_COUNT_ON_DESKTOP: 3,
    COLUMNS_COUNT_ON_MOBILE: 1,
    GRID_CLASS: "projects-grid",
    CARD_CLASS: "project-card",
}

function createGrid(parent) {
    const validProjects = projects.filter(validateProject);

    const grid = document.createElement("div");
    grid.className = CONFIG.GRID_CLASS;

    const gridFragment = document.createDocumentFragment();

    validProjects.forEach(project => {
        const card = createCard("div", project);
        card.addEventListener("click", () => openProjectPopup(card.id));
        gridFragment.appendChild(card);
    })

    grid.appendChild(gridFragment);
    parent.appendChild(grid);
}

function createCard(element, project) {
    const card = document.createElement(element);
    card.className = CONFIG.CARD_CLASS;
    card.id = project.id;

    const image = document.createElement("img");
    image.className = "project_card_img";
    image.src = project.img_src;
    image.alt = project.img_alt;
    image.loading = "lazy";

    const name = document.createElement("h3");
    name.textContent = project.name;

    const about = document.createElement("p");
    about.textContent = project.about;
    
    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(about);

    return card;
}

function validateProject(project) {
    if (!project || typeof project !== "object") {
        console.warn("Project must be object");
        return false;
    }
    
    const required = ["name", "img_src", "img_alt", "about"];
    const missing = required.filter(field => !(field in project));

    if (missing.length > 0) {
        console.warn(`Project must be constain ${missing}`);
        return false;
    }

    if (required.filter(field => typeof project[field] !== "string").length > 0) {
        console.warn("All fields in projects must be string");
        return false;
    }

    if (required.filter(field => !project[field].trim()).length > 0) {
        console.warn("All fields must not be empty");
        return false;
    }

    return true;
    
}

document.addEventListener("DOMContentLoaded", () =>{
    const showcaseParent = document.querySelector(".projects");

    if (!showcaseParent)
    {
        console.error("Failed to find parent for projects grid");
        return;
    }

    try {
        createGrid(showcaseParent);
    } catch (error) {
        console.error(`Failed to create projects grid: ${error}`);
        showcaseParent.innerHTML = "<p>Ошибка загрузки проектов</p>";
    }
})
