import { lockScroll, unlockScroll } from "../../lock_scroll.js";
import { POPUP_QUERIES, REQUIRED_FIELDS, GENERATING_HEAD_FIELDS } from "../project_configs.js";
import { generateImages, attachButtonHandlers } from "./popup_images.js";
import { loadFile } from "./file_reader.js";
import projects from "../../../data/projects.json" with { type: "json"};
import fieldsStyles from "../../../data/project_fields_styles.json" with { type: "json" };
import translations from "../../../data/translations.json" with { type: "json" };

const popupOverlay = document.getElementById(POPUP_QUERIES.overlayId);
const popup = document.getElementById(POPUP_QUERIES.popupId);

export async function openProjectPopup(projectId) {
    const project = projects.find(project => project.id === projectId);
    await configureProject(project);

    popupOverlay.style.display = "block";
    lockScroll();

    popup.scrollTop = 0;
}

async function configureProject(project) {
    if (!projectIsValid(project))
        return;

    const projectName = document.getElementById(POPUP_QUERIES.nameId);
    projectName.textContent = project.name;

    const fieldsParent = document.getElementById(POPUP_QUERIES.fieldsId);
    generateFields(project, fieldsParent);

    const nextButton = document.getElementById(POPUP_QUERIES.nextButtonId);
    const previousButton = document.getElementById(POPUP_QUERIES.previousButtonId);
    const dotsParent = document.getElementById(POPUP_QUERIES.dotsParentId);
    
    generateImages(project, dotsParent);
    attachButtonHandlers(nextButton, previousButton);

    const projectDescription = document.getElementById(POPUP_QUERIES.descriptionId);
    const descriptionContent = await loadFile(project.description);
    if (descriptionContent) {
        projectDescription.innerHTML = marked.parse(descriptionContent); 
    }

    const sourceCode = document.getElementById(POPUP_QUERIES.sourceId);
    if (sourceCode) {
        sourceCode.style.display = "flex";
        sourceCode.href = "";
        if (project.source.length > 0)
            sourceCode.href = project.source;
        else 
            sourceCode.style.display = "none";
    }

    const projectInfoContainer = document.getElementById(POPUP_QUERIES.infoId);

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

const closePopupButton = document.getElementById(POPUP_QUERIES.closeButtonId);
closePopupButton.onclick = closePopup;

popup.addEventListener("click", (event) => event.stopPropagation());
