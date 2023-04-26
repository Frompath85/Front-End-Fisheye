function displayModal() {
    const modal = document.getElementById("contact_modal");
    const MyForm = document.getElementById("Myform");
    MyForm.reset();
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

function envoyer(){//je ferme la modale que si les champs sont correct

    let IsValide = false;
    const prenom = document.getElementById("prenom");
    const nom = document.getElementById("nom");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    const MsgErrPrenom = document.querySelector(".ErrPrenom");
    const MsgErrNom = document.querySelector(".ErrNom");
    const MsgErrEmail = document.querySelector(".ErrEmail");
    const MsgErrMessage = document.querySelector(".ErrMessage")

    const patternName = /^[a-zA-Z]+(?:[- ]?[a-zA-Z]+)*\s*$/;
    const patternEmail = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const patternMessage = /^(?=.{10,})\S+/;

    if(prenom.value.match(patternName)){
        MsgErrPrenom.style.display = "none";
        IsValide = true;
    }else {
            MsgErrPrenom.style.display = "block";
            IsValide = false;
          }

    if(nom.value.match(patternName) ){
        MsgErrNom.style.display = "none";
        IsValide = true;
    } else { 
             MsgErrNom.style.display = "block";
             IsValide = false;
            }

    if(email.value.match(patternEmail)){
        MsgErrEmail.style.display = "none";
        IsValide = true;
    }else{ 
           MsgErrEmail.style.display = "block";
           IsValide = false;
        }

    if(message.value.match(patternMessage)){
        MsgErrMessage.style.display = "none";
        IsValide = true;
    }else {
            MsgErrMessage.style.display = "block";
            IsValide = false;
        }    

    if (!IsValide){
        return;
    }
    console.log("Prénom : "+prenom.value);
    console.log("Nom : "+ nom.value );
    console.log("Email : "+email.value);
    console.log("Message :"+message.value);
    console.log("données validés, fermeture de la modale");
    closeModal();
}          
