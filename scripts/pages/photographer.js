
async function getOnePhotographer() {
  
   //recherche des données du ficher json
  const req = await fetch('./data/photographers.json')
  const resp = await req.json();

 //je recupère le id de l'article selectionné
  const id = new URL(location.href).searchParams.get('id');

  // Faire une recherche javascript sur resp avec l'id fourni
  // return toutes les données
  const index = resp.photographers.findIndex(el => el.id == id)
  //console.log(resp.photographers[index]);

  return(resp.photographers[index])
 
}

async function displayPhotograph(){
  
  const data  = await getOnePhotographer();
  const { name, country, city, tagline, portrait} = data;

  //le Html de la partie header photograph
  const codeHeader=`<section class="photograph-information">
                <h1> ${name}</h1>
                <div>
                 <p>${city}, ${country}</p>
                <span>${tagline}</span>
               </div>
              </section>
              <button class="contact_button" onclick="displayModal()" >Contactez-moi</button>
              <img class="photograph-photo" src="assets/photographers/${portrait}" alt="photos du photographe ${name}"  tabindex="5">
              `
            
  document.querySelector('.photograph-header')
  .insertAdjacentHTML('afterbegin',codeHeader);
 
  return name;
}

displayPhotograph();

async function getAllMedia(){
  //je recupere les données
  const req = await fetch('./data/photographers.json')
  const resp = await req.json();
 
  //je recupere l index du photographe 
  const id = new URL(location.href).searchParams.get('id');

  // je retourne tous les medias avec l'id du photographe selectionné
  return resp.media.filter(med => med.photographerId == id);
}

async function displaymedia(dataMedia){

  const {name} = await getOnePhotographer();//recupérer le nom du dossier contenant les medias
 
  dataMedia.forEach((media) => {//est executé 11 fois selon le nbre de media par exple
       const MediaArticle = MediaFactory(media, name);
       const MediaSection = document.querySelector(".media-section");
       MediaSection.appendChild(MediaArticle);         
  });

}

async function initMedia() {
  const dataMedia  = await getAllMedia();
  displaymedia(dataMedia);
};

initMedia();