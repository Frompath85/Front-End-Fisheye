    //je recupère les données des photographes
    async function getPhotographers() {

        const req = await fetch('data/photographers.json')
        const resp = await req.json()

        return(resp.photographers)
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");
        
        photographers.forEach((photographer) => {
            // eslint-disable-next-line no-undef
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        const photographers = await getPhotographers();
        displayData(photographers);
    }
    
    init();
    
