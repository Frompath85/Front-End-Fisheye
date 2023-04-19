
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
                <p>${city}, ${country}</p>
                <span>${tagline}</span>
              </section>
              <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
              <img class="photograph-photo" src="assets/photographers/${portrait}" alt="photos du photographe ${name}">
              `
            
  document.querySelector('.photograph-header')
  .insertAdjacentHTML('afterbegin',codeHeader);
 
 // return name;
}

displayPhotograph();

async function getAllMedia(){

  //je recupere les données
  const req = await fetch('./data/photographers.json')
  const resp = await req.json();
  //console.log(resp.media);
  //je recupere l index du photographe 
  const id = new URL(location.href).searchParams.get('id');

  // je retourne tous les media avec l'id du photographe semectionné
  return resp.media.filter(med => med.photographerId == id);
}

async function displaymedia(){

  const dataMedia  = await getAllMedia();

  // avec la valeur du photographerId je modifie le lien de l'image
  const num = Object.values(dataMedia[1]);
  //console.log(num[1])
  const link = getlink(num[1]);
  

      for(i = 0; i< dataMedia.length; i++){
        
         const props= Object.keys(dataMedia[i])
         //console.log (props[3])

         if (props[3] == "image"){
              // console.log('image :'+dataMedia[i].image)
              const codeMedia= `<article class="photograph-article">
              <img class="media-img" src="assets/images/${link}/${dataMedia[i].image}" alt="">
              <div class="media-title">
                <p> ${dataMedia[i].title} </p>
                <p>${dataMedia[i].likes} <i class="fa-solid fa-heart"></i> </p>
              </div>
            </article>`
        document.querySelector('.media-section')
        .insertAdjacentHTML('afterbegin',codeMedia);
      }
      else if (props[3] == "video"){
     // console.log('video :'+dataMedia[i].video)
      const codeMedia= `<article class="photograph-article">
              <video controls class="media-img">
              <source="assets/images/${link}/${dataMedia[i].video}"type="video/mp4" >
              </video>
              <div class="media-title">
                <p> ${dataMedia[i].title} </p>
                <p>${dataMedia[i].likes} <i class="fa-solid fa-heart"></i> </p>
              </div>
            </article>`
        document.querySelector('.media-section')
        .insertAdjacentHTML('afterbegin',codeMedia);
    }
      }
}

function getlink(phId){
  return phId == "195" ? "Marcel" : phId == "925" ? "Rhode" : phId == "527" ? "Nabeel" : 
  phId == "82" ? "Tracy" : phId == "930" ? "Ellie-Rose" : phId == "243" ? "Mimi" : "";
}


displaymedia();