function photographerFactory(data) {
    const {id, name, portrait , tagline, city, country, price} = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const lien = document.createElement('a');
        const lienID = `./photographer.html?id=${id}`;
        console.log("lien avec ID : "+ lienID);
        lien.setAttribute("href",lienID);
       // lien.setAttribute("id", id);
        lien.setAttribute("aria-label", "Lien vers la page de :"+ name );
        
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("Alt", `photos du photographe ${name}`);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        // const location = city +', '+country;
        // const location = `${city}, ${country}`;
        const prixjour = `${price}€/jour`;

        const Plocation = document.createElement('p');//localisation
        Plocation.setAttribute("class","Plocation");
        Plocation.textContent = `${city}, ${country}`;

        const Ptagline = document.createElement('p');// description
        Ptagline.setAttribute("class","Ptagline");
        Ptagline.textContent = tagline;

        const Pprice = document.createElement('p');//prix par jpur
        Pprice.setAttribute("class","Pprice");
        Pprice.textContent = prixjour;

        lien.appendChild(img);
        lien.appendChild(h2);
        article.appendChild(lien);
        article.appendChild(Plocation);
        article.appendChild(Ptagline);
        article.appendChild(Pprice);
        return (article);
    }

   return { name, picture, getUserCardDOM }

}
