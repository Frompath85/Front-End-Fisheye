
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

// ********************** LIGHTBOX ****************************
 //DOM Lightbox
  const lightboxImage = document.querySelector(".lightbox_img");
  const lightboxVideo = document.querySelector(".lightbox_video");
  const lightboxDescription = document.querySelector(".lightbox_description");

   //je laisse une trace du derneir Media affiché
  let LastTypeMedia ="";
  let LastLinkMedia = "";
  let LastTitleMedia = "";
  let isLightboxOpen = false

const lightboxNext = document.querySelector(".lightbox_next");
lightboxNext.addEventListener("click", (e) =>{ 
      NextMedia();
});

const lightboxPrev = document.querySelector(".lightbox_prev");
lightboxPrev.addEventListener("click", (e) =>{ 
     PreviousMedia()
});

const lightboxClose = document.querySelector(".lightbox_close");
lightboxClose.addEventListener("click",(e) =>{
  CloseLightbox();
});

const body2 = document.querySelector('body')
body2.addEventListener('keydown', (e) => {
    if(e.key == "Escape" && isLightboxOpen){
      CloseLightbox();
    }
    if(e.key == "ArrowRight" && isLightboxOpen){
      NextMedia();
    }
    if(e.key == "ArrowLeft" && isLightboxOpen){
      PreviousMedia();
    }
})

function loadImage(TypeMedia, LinkMedia, TitleMedia ){

  switch (TypeMedia) {
    case 'image': case 'IMG':
      lightboxVideo.style.display = "none";
      lightboxImage.style.display = "block";
      lightboxImage.src = LinkMedia;
      break;
    case 'video': case 'VIDEO':
      lightboxImage.style.display = "none";
      lightboxVideo.style.display = "block";
      lightboxVideo.src = LinkMedia;   
      break;
    default:
      console.log('veuillez vérifier le type du Media');
  }
  lightboxDescription.textContent = TitleMedia;

  LastTypeMedia =TypeMedia;
  LastLinkMedia = LinkMedia;
  LastTitleMedia = TitleMedia; 
  isLightboxOpen = true;
  //console.log(LastTypeMedia +" * "+LastLinkMedia+" * "+LastTitleMedia)
}

function NextMedia(){
  // je recupere un tableau contient tout les liens des medias
   const AllMediaImg = Array.from(document.querySelectorAll(".media-img"));
   const ArrayLink = AllMediaImg.map(link => link.getAttribute("Src"));
 
   //difinir l'index de l'image en cours
   let pos = ArrayLink.findIndex( i => i == LastLinkMedia );
   if(pos == ArrayLink.length-1){ pos =-1}
 
   // je recupère un tableau contient tous les titres
   const data = document.querySelectorAll(".title")
 
   //console.log(AllMediaImg[pos+1].tagName);//renvoi IMG ou VIDEO
 
    loadImage(AllMediaImg[pos+1].tagName, ArrayLink[pos+1], data[pos+1].textContent)
}

function PreviousMedia(){
 
   const AllMediaImg = Array.from(document.querySelectorAll(".media-img"));
   const ArrayLink = AllMediaImg.map(link => link.getAttribute("Src"));
   let pos = ArrayLink.findIndex( i => i == LastLinkMedia );
   if(pos == 0){ pos = ArrayLink.length}
   const data = document.querySelectorAll(".title")
 
    loadImage(AllMediaImg[pos-1].tagName, ArrayLink[pos-1], data[pos-1].textContent)
 
}

function CloseLightbox(){
  const lightbox = document.querySelector(".lightbox");
  lightbox.style.display = "none";
  isLightboxOpen=false;
}