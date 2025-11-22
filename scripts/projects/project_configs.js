export const POPUP_QUERIES = {
    popupId: "popup",
    overlayId: "popup overlay",

    nameId: "popup project-name",

    fieldsId: "popup project-fields",
    type: "fields__type",
    status: "pfields__status",
    development_period: "fields__development-period",
    
    currentImage: "image-panel__current-image",
    previousButtonId: "popup project-previous-button",
    nextButtonId: "popup project-next-button",
    dotsParentId: "popup images-dots",
    dot: "dots__dot",
    selectedDot: "dots__dot__selected",

    infoId: "popup project-representation-info",
    descriptionId: "popup project-description",  
    sourceId: "popup project-source",

    closeButtonId: "popup close-button"
}

export const REQUIRED_FIELDS = [
    "name",
    "type",
    "status",
    "development_period",
    "img_src",
    "img_alt",
    "description",
    "source"
]

export const GENERATING_HEAD_FIELDS = [
    "type",
    "status",
    "development_period"
]
