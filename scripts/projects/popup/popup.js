import { lockScroll, unlockScroll } from "../../lock_scroll.js";
import { POPUP_CLASSES, REQUIRED_FIELDS, GENERATING_HEAD_FIELDS } from "../project_configs.js";
import { generateImages, attachButtonHandlers } from "./popup_images.js";
import projects from "../../../data/projects.json" with { type: "json"};
import fieldsStyles from "../../../data/project_fields_styles.json" with { type: "json" };
import translations from "../../../data/translations.json" with { type: "json" };

const popupOverlay = document.querySelector(".popup-overlay");
const popup = document.querySelector(".project-popup");

export function openProjectPopup(projectId) {
    const project = projects.find(project => project.id === projectId);
    configureProject(project);

    popupOverlay.style.display = "block";
    lockScroll();

    popup.scrollTop = 0;
}

function configureProject(project) {
    if (!projectIsValid(project))
        return;

    const projectName = document.querySelector(`.${POPUP_CLASSES.name}`);
    projectName.textContent = project.name;

    const fieldsParent = document.querySelector(`.${POPUP_CLASSES.fields}`)
    generateFields(project, fieldsParent);

    const nextButton = document.querySelector(`.${POPUP_CLASSES.nextButton}`);
    const previousButton = document.querySelector(`.${POPUP_CLASSES.previousButton}`);
    const dotsParent = document.querySelector(`.${POPUP_CLASSES.dotsParent}`);
    
    generateImages(project, dotsParent);
    attachButtonHandlers(nextButton, previousButton);
    
    const projectDescription = document.querySelector(`.${POPUP_CLASSES.description}`);
    projectDescription.textContent = project.description;

    const sourceCode = document.querySelector(`.${POPUP_CLASSES.source}`);
    if (sourceCode) {
        sourceCode.href = "";
        if (project.source.length > 0)
            sourceCode.href = project.source;
    }

    const projectInfoContainer = document.querySelector(`.${POPUP_CLASSES.info}`);

    generateRepresentationInfo(project.info, projectInfoContainer);
}

function generateFields(project, fieldsParent) {
    fieldsParent.innerHTML = "";
        GENERATING_HEAD_FIELDS.forEach(field => {
            const fieldElement = document.createElement("p");
            fieldElement.classList.add(`fields__${field}`)
            fieldElement.textContent = `${
                    translations[project[field]] || project[field]
                }`;
            fieldElement.title = translations[field] || field;
            setCssProperties([field, project[field]], fieldElement);

            fieldsParent.appendChild(fieldElement);
        })
}

function generateRepresentationInfo(fields, parent) {
    parent.innerHTML = "";

    Object.keys(fields).forEach(field => {
        if (fields[field]){
            const fieldElement = document.createElement("p");
            const spanElement = document.createElement("span");

            fieldElement.textContent = `${translations[field] || field}: `;
            fieldElement.classList.add(`info__${field}`);
            fieldElement.id = field;

            spanElement.textContent = `${translations[fields[field]] || fields[field]}`;
            spanElement.style.fontWeight = "bold";

            setCssProperties([field.toLowerCase(), fields[field].toLowerCase()], spanElement)
            
            fieldElement.appendChild(spanElement);
            parent.appendChild(fieldElement);
        }
    })
}

function projectIsValid(project) {
    if (!project || typeof project !== "object") {
        console.warn("Project must be object");
        return false;
    }
    
    const missing = REQUIRED_FIELDS.filter(field => !(field in project));

    if (missing.length > 0) {
        console.warn(`Project must be constain ${missing}`);
        return false;
    }

    const notStrings = REQUIRED_FIELDS.filter(field => typeof project[field] !== "string");
    if (notStrings.length > 0) {
        console.warn(`All fields in projects must be string: ${notStrings}`);
        return false;
    }

    return true;
}

function setCssProperties(fields, element){
    fields.forEach(field => {
        if (field in fieldsStyles) 
        {
            Object.entries(fieldsStyles[field]).forEach(entry => {
                element.style.setProperty(entry[0], entry[1]);
            })
        }
    })
}

function closePopup() {
    popupOverlay.style.display = "none";
    unlockScroll();
}


popupOverlay.addEventListener("click", closePopup);
popupOverlay.setAttribute('data-clickable', 'true');

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && popupOverlay.style.display === "block")
        closePopup();
})

const closePopupButton = document.querySelector(`.${POPUP_CLASSES.closeButton}`);
closePopupButton.onclick = closePopup;

popup.addEventListener("click", (event) => event.stopPropagation());
