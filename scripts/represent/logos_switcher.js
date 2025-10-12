import paths from "../../data/paths_to_logos.json" with { type: "json" }

const logo = document.getElementById("logo");
logo.setAttribute('data-clickable', 'true');


logo.onclick = function() {
    const logoSrc = logo.getAttribute("src");

    logo.setAttribute("src", paths.indexOf(logoSrc) < paths.length - 1 ? paths[paths.indexOf(logoSrc) + 1] : paths[0]);
};
