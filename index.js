const projectIds = {
    ["projectId-1"]: {
        name: "ERP/PGI de Gestion d'école",
        fileName: "erp_s5_s6.html"
    },

    ["projectId-2"]: {
        name: "Projets Divers C/C++",
        fileName: "divers_cpp.html"
    },
}

document.addEventListener("DOMContentLoaded", (ev) => {

    document.querySelectorAll(".project-card-button").forEach(element => {
        console.log(element.id);
        
        element.parentNode.querySelector(".project-card-title").textContent = projectIds[element.id].name
        

        element.addEventListener("click", (elt) => {
            // console.log(elt.target.id);
            console.log(projectIds[elt.target.id]);

            fetch(`../content/projects/${projectIds[elt.target.id].fileName}`)
            .then(response => {
                if (response.ok) {
                    return response.text()
                }
            })
            .then(data => {
                document.querySelector("#project-details-modal").style.visibility = "visible"
                document.querySelector("#project-details-modal-content").innerHTML = data
            })
            
        })
    });
    
})