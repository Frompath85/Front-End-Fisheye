/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// Création d'un booléen accessible en global
let isModalOpen = false;

const MsgErrPrenom = document.querySelector(".ErrPrenom");
const MsgErrNom = document.querySelector(".ErrNom");
const MsgErrEmail = document.querySelector(".ErrEmail");
const MsgErrMessage = document.querySelector(".ErrMessage");

function displayModal() {
    const modal = document.getElementById("contact_modal");
    const MyForm = document.getElementById("Myform");
    MyForm.reset();
    MsgErrPrenom.style.display = "none";
    MsgErrNom.style.display = "none";
    MsgErrEmail.style.display = "none";
    MsgErrMessage.style.display = "none";
	modal.style.display = "block";
    isModalOpen = true;
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    isModalOpen = false;
}

async function contactPhotographer(){// afficher le nom sur la modale de contact
    const {name} = await getOnePhotographer();
    //console.log(name);
    const namePhotographer = document.getElementById("name_photographer");
    namePhotographer.innerHTML += `  ${name}` ;
}
contactPhotographer();

function envoyer(){//je ferme la modale que si les champs sont correctes

    let IsValideName = false;
    let IsValideFirstName = false;
    let IsValideEmail = false;
    let IsValideMsg = false;
    const prenom = document.getElementById("prenom");
    const nom = document.getElementById("nom");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    const patternName = /^[a-zA-Z]+(?:[- ]?[a-zA-Z]+)*\s*$/;
    const patternEmail = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const patternMessage = /^(?=.{10,})\S+/;

    if(prenom.value.match(patternName)){
        MsgErrPrenom.style.display = "none";
        IsValideName = true;
    }else {
            MsgErrPrenom.style.display = "block";
            IsValideName = false;
          }

    if(nom.value.match(patternName) ){
        MsgErrNom.style.display = "none";
        IsValideFirstName = true;
    } else { 
             MsgErrNom.style.display = "block";
             IsValideFirstName = false;
            }

    if(email.value.match(patternEmail)){
        MsgErrEmail.style.display = "none";
        IsValideEmail = true;
    }else{ 
           MsgErrEmail.style.display = "block";
           IsValideEmail = false;
        }

    if(message.value.match(patternMessage)){
        MsgErrMessage.style.display = "none";
        IsValideMsg = true;
    }else {
            MsgErrMessage.style.display = "block";
            IsValideMsg = false;
        }    

    if (IsValideMsg && IsValideEmail && IsValideFirstName && IsValideName){
        console.log("Prénom : "+prenom.value);
        console.log("Nom : "+ nom.value );
        console.log("Email : "+ email.value);
        console.log("Message :"+message.value);
        console.log("données validés, fermeture de la modale");
        closeModal();  
    }
    
} 

document.querySelector(".envoyer_button").addEventListener("click",() => envoyer());

const closeIcon = document.querySelector('#closeIcon')
closeIcon.addEventListener("keydown", (e) => {
   if(e.key == "Enter"){ 
    closeModal();
   }
   if(e.key == "Tab"){
    document.querySelector('.modal').focus();
   }
})
closeIcon.addEventListener("click",() =>{
    closeModal();
})

const body = document.querySelector('body')
body.addEventListener('keydown', (e) => {
    if(e.key == "Escape" && isModalOpen){
        closeModal();
    }
})