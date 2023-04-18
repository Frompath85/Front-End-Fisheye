async function getOnePhotographer() {

  //je recupère le id de l'article selectionné
  const id = new URL(location.href).searchParams.get('id');
  //console.log(" id selectionné "+id);

  //recherche des données du ficher json
  const req = await fetch('./data/photographers.json')
  const resp = await req.json();

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
 
  return name;
}


displayPhotograph();

async function getAllMedia(){

  //je recupere les données
  const req = await fetch('./data/photographers.json')
  const resp = await req.json();
  //console.log(resp.media);
  //je recupere l index du photographe 
  const id = new URL(location.href).searchParams.get('id');
  //console.log(id);

  // je cherche les photos avec l index du photographe 
  const ph = resp.media.filter(med => med.photographerId == id)
  //console.log('la valeur de ph' + ph[1]);

  return ph;
}
async function displaymedia(){

  const dataMedia  = await getAllMedia();

      for(i = 0; i< dataMedia.length; i++){
        
         const props= Object.keys(dataMedia[i])
         //console.log (props[3])

         if (props[3] == "image"){
               console.log('image :'+dataMedia[i].image)
              const codeMedia= `<article class="photograph-article">
              <img class="media-img" src="assets/images/Mimi/${dataMedia[i].image}" alt="">
              <div class="media-title">
                <p> ${dataMedia[i].title} </p>
                <p>${dataMedia[i].likes} <i class="fa-solid fa-heart"></i> </p>
              </div>
            </article>`
        document.querySelector('.media-section')
        .insertAdjacentHTML('afterbegin',codeMedia);
      }
      else if (props[3] == "video"){
      console.log('video :'+dataMedia[i].video)
      const codeMedia= `<article class="photograph-article">
              <video controls class="media-img">
              <source="assets/images/Mimi/${dataMedia[i].video}"type="video/mp4" >
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
displaymedia();