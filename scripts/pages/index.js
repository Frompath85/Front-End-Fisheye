    async function getPhotographers() {

        const req = await fetch('./data/photographers.json')
        const resp = await req.json()

        return(resp.photographers)

    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");
        
        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const photographers = await getPhotographers();
        console.log(photographers)
        displayData(photographers);
    };
    
    init();
    
