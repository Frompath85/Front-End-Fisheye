function photographerFactory(data) {
    const {id, name, portrait , tagline, city, country, price} = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const lien = document.createElement('a');
        lien.setAttribute("href",`./photographer.html?id=${id}`);
        lien.setAttribute("aria-label", `Lien vers la page de :${name}` );
        
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("Alt", `photos du photographe ${name}`);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const div = document.createElement('div');
        div.setAttribute("class","align-information");

        const Plocation = document.createElement('p');//localisation
        Plocation.setAttribute("class","Plocation");
        Plocation.textContent = `${city}, ${country}`;

        const Ptagline = document.createElement('p');// description
        Ptagline.setAttribute("class","Ptagline");
        Ptagline.textContent = tagline;

        const Pprice = document.createElement('p');//prix par jpur
        Pprice.setAttribute("class","Pprice");
        Pprice.textContent = `${price}€/ jour`;

        lien.appendChild(img);
        lien.appendChild(h2);
        div.appendChild(Plocation);
        div.appendChild(Ptagline);
        div.appendChild(Pprice);
        article.appendChild(lien);
        article.appendChild(div);
        
        return (article);
    }

   return { name, picture, getUserCardDOM }

}
