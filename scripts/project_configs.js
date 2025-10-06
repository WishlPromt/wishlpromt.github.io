export const POPUP_CLASSES = {
    name: "project-popup__name",

    fields: "project-popup__fields",
    type: "fields__type",
    status: "pfields__status",
    development_period: "fields__development-period",
    
    image: "project-representation__image",
    info: "project-representation__info",
    description: "project-popup__description",  
    source: "project-popup__source",

    closeButton: "button-container__close-button"
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
