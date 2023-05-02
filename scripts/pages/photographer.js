
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
  //dataMedia.sort((a,b) => b.likes - a.likes );// par defaut les media sont triés par popularité
  displaymedia(dataMedia);
}
initMedia();
//******************************Fonction de Trie */

const TrierPar = document.getElementById("trier-par");

TrierPar.addEventListener("change", async () =>{
  const dataMedia  =  await getAllMedia();
  const {name} = await getOnePhotographer();
  //console.log(dataMedia)

    switch(TrierPar.value){
        case 'popularite':
          dataMedia.sort((a,b) => b.likes - a.likes );
          console.log(dataMedia)
          
         changeBysort(dataMedia, name);
        break;
        case 'date':

            console.log("trier par date")
        break;
        case 'titre':
          console.log("trier par titre")
        break;
    }
 
});

// une fonction qui change la disposition des données
function changeBysort(dataMedia, nameOfPhotographe){
      //DOM
      const LienImage = document.querySelectorAll('.media-img');
      const LienVideo = document.querySelectorAll('.media-video');
      const TitreMedia = document.querySelectorAll(".title");
      const LikeMedia = document.querySelectorAll('.likes');
      
    for(let i = 0; i < dataMedia.length; i++){
      const TypeMedia = Object.keys(dataMedia[i]);
      console.log(TypeMedia[3])

      if(TypeMedia[3] == "image"){
        LienImage[i].style.display = "block";
        LienVideo[i].style.display = "none";
        LienImage[i].src = `assets/images/${nameOfPhotographe}/${dataMedia[i].image}`;
      }
      else if(TypeMedia[3] == "video"){
        LienImage[i].style.display = "none";
        LienVideo[i].style.display = "block";
        LienVideo[i].src = `assets/images/${nameOfPhotographe}/${dataMedia[i].video}`;
      }
      TitreMedia[i].textContent = dataMedia[i].title;
      LikeMedia[i].textContent = dataMedia[i].likes;
      
    } 
}

// ********************** LIGHTBOX ****************************
 //DOM Lightbox
  const lightboxImage = document.querySelector(".lightbox_img");
  const lightboxVideo = document.querySelector(".lightbox_video");
  const lightboxDescription = document.querySelector(".lightbox_description");

   //je laisse une trace du derneir Media affiché
  let LastTypeMedia ="";
  let LastLinkMedia = "";
  let LastTitleMedia = "";
  let IsLightboxOpen = false

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
    if(e.key == "Escape" && IsLightboxOpen){
      CloseLightbox();
    }
    if(e.key == "ArrowRight" && IsLightboxOpen){
      NextMedia();
    }
    if(e.key == "ArrowLeft" && IsLightboxOpen){
      PreviousMedia();
    }
})

function loadImage(TypeMedia, LinkMedia, TitleMedia){

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
  IsLightboxOpen = true;
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
  IsLightboxOpen=false;
}