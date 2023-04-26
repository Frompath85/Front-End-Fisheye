
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
 
  return(resp.photographers[index]);
}

async function displayPhotographe(){
  
  const data  = await getOnePhotographer();
  const { name, country, city, tagline, portrait} = data;

  //le Html de la partie header photograph
  const codeHeader =
      `<section class="photograph-information">
          <h1 tabindex="1"> ${name}</h1>
          <div tabindex="1">
            <p>${city}, ${country}</p>
            <span>${tagline}</span>
          </div>
        </section>
        <button tabindex="1" class="contact_button" onclick="displayModal()" >Contactez-moi</button>
        <img  tabindex="3" class="photograph-photo" src="assets/photographers/${portrait}" alt="photos du photographe ${name}">`
            
  document.querySelector('.photograph-header')
  .insertAdjacentHTML('afterbegin',codeHeader);

}

displayPhotographe();

async function getAllMedia(){
  //je recupere les données
  const req = await fetch('./data/photographers.json');
  const resp = await req.json();
 
  //je recupere l index du photographe 
  const id = new URL(location.href).searchParams.get('id');

  // je retourne tous les medias avec l'id du photographe selectionné
  return resp.media.filter(med => med.photographerId == id);
}

async function displaymedia(dataMedia){

  const {name, price} = await getOnePhotographer();//recupérer le nom du dossier contenant les medias
 
  let NbrLikes = 0;

  dataMedia.forEach((media) => {//est executé 11 fois selon le nbre de media par exple
       const MediaArticle = MediaFactory(media, name);
       const MediaSection = document.querySelector(".media-section");
       MediaSection.appendChild(MediaArticle);   
       NbrLikes += media.likes;
  });
  
  //html de la partie encart des likes
  const codeEncart = `<div>
                        <p id="Likes"> ${NbrLikes} </p> 
                        <i class="fa-solid fa-heart"></i>
                      </div>
                      <p> ${price} €/jour</p>`
  document.querySelector(".encart-likes").insertAdjacentHTML('afterbegin',codeEncart);

}

async function initMedia() {
  const dataMedia  = await getAllMedia();
  displaymedia(dataMedia);
}

initMedia();