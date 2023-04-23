function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

async function contactPhotographer(){// afficher le nom sur la modale de contact
    const {name} = await getOnePhotographer();
    //console.log(name);
    const namePhotographer = document.getElementById("name_photographer");
    namePhotographer.innerHTML += `  ${name}` ;
}

contactPhotographer();

const contactButton = document.querySelector(".contact_button")
                      .addEventListener("click",envoyer);

function envoyer(){
    
    const prenom = document.getElementById("prenom");
    const nom = document.getElementById("nom");
    const email = document.getElementById("email");

    const patternName = /^[a-zA-Z]+(?:[- ]?[a-zA-Z]+)*\s*$/;
    const patternEmail = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if(prenom.value.match(patternName)&& nom.value.match(patternName) ){
        console.log("prenom et nom correct : "+prenom.value + " "+ nom.value );
    }
    else 
    console.log("prenom ou nom incorrect");

    if(email.value.match(patternEmail)){
        console.log("email correct : "+email.value);
    }
    else 
    console.log("email incorrect");
 }
