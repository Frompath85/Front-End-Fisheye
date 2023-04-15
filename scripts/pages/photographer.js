//Mettre le code JavaScript lié à la page photographer.html
async function getOnePhotographer(id) {

  const req = await fetch('./data/photographers.json')
  const resp = await req.json()

  // Faire une recherche javascript sur resp avec l'id fourni
  // return toutes les données
  const index = resp.photographers.findIndex(el => el.id == id)

  return(resp.photographers[index])

}
async function getArticleID(){
    console.log(new URL(location.href).searchParams.get('id'));

    // Avec l'id, tu vas chercher sur le tableau que tu obtiens quand tu fais ton fetch

    // Utilise la fonction pour récupérer un photographe précis
    const photographer = await getOnePhotographer(new URL(location.href).searchParams.get('id'))
    console.log(photographer)
  return new URL(location.href).searchParams.get('id');
}
getArticleID();
            