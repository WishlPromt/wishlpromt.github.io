import { POPUP_CLASSES } from "../project_configs.js";

const imagesList = [];
let currentImageIndex = 0;

const currentImageElement = document.querySelector(`.${POPUP_CLASSES.current_image}`);
let selectedImageElement;

function nextImage() {
    if (imagesList.length > 0) {
        currentImageIndex = currentImageIndex != imagesList.length-1 ? currentImageIndex + 1 : 0;
        setCurrentImage(currentImageIndex);
    }

    else
        console.warn("Images list is empty");
}

function previousImage() {
    if (imagesList.length > 0) {
        currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : imagesList.length-1;
        setCurrentImage(currentImageIndex);
    }

    else
        console.warn("Images list is empty");
}

function newImage(src, alt) {
    imagesList.push({
        src: src,
        alt: alt
    });
}

function setCurrentImage(index) {
    const image = imagesList[index];

    if (currentImageIndex != index)
        currentImageIndex = index;

    if (!image){
        console.warn(`Image is ${image}`);
        return;
    }

    currentImageElement.src = image.src;
    currentImageElement.alt = image.alt; 
}

export function generateImages(project) {
    imagesList.length = 0;
    currentImageIndex = 0;
    currentImageElement.src = "";
    currentImageElement.alt = "";
    
    if ("images" in project)
    {
        Object.entries(project.images).forEach(field => {
            newImage(field[1], field[0]);
        })
    }
    
    if (imagesList.length === 0)
        newImage(undefined, project.img_src, project.img_alt);

    setCurrentImage(0);
}

export function attachButtonHandlers(nextButton, previousButton) {
    nextButton.addEventListener("click", nextImage);
    previousButton.addEventListener("click", previousImage);
}
