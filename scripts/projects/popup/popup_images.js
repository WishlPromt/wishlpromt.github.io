import { POPUP_QUERIES } from "../project_configs.js";

const imagesList = [];
let currentImageIndex = 0;

const currentImageElement = document.querySelector(`.${POPUP_QUERIES.currentImage}`);
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

function newImage(src, alt, element) {
    imagesList.push({
        element: element,
        src: src,
        alt: alt
    });
    const index = imagesList.length-1;
    if (element) {
        element.addEventListener("click", () => {
            setCurrentImage(index);
        });
    }
}

function setCurrentImage(index) {
    const image = imagesList[index];

    if (selectedImageElement)
        selectedImageElement.classList.remove(POPUP_QUERIES.selectedDot); 

    if (currentImageIndex != index)
        currentImageIndex = index;

    if (!image){
        console.warn(`Image is ${image}`);
        return;
    }

    if (image.element) {
        image.element.classList.add(POPUP_QUERIES.selectedDot);
        selectedImageElement = image.element;
    }

    currentImageElement.src = image.src;
    currentImageElement.alt = image.alt; 
}

export function generateImages(project, dotsParent) {
    imagesList.length = 0;
    currentImageIndex = 0;
    currentImageElement.src = "";
    currentImageElement.alt = "";
    dotsParent.innerHTML = "";
    
    if ("images" in project)
    {
        Object.entries(project.images).forEach(field => {
            const imageDot = document.createElement("button");
            if (dotsParent) {
                imageDot.classList.add(POPUP_QUERIES.dot);
                dotsParent.appendChild(imageDot);
            }
            newImage(field[1], field[0], imageDot);
        })
    }
    
    if (imagesList.length === 0)
        newImage(project.img_src, project.img_alt);

    setCurrentImage(0);
}

export function attachButtonHandlers(nextButton, previousButton) {
    nextButton.addEventListener("click", nextImage);
    previousButton.addEventListener("click", previousImage);
}
