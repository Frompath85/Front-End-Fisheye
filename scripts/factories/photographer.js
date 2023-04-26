function photographerFactory(data) {
    const {id, name, portrait , tagline, city, country, price} = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const lien = document.createElement('a');
        lien.setAttribute("href",`./photographer.html?id=${id}`);
        lien.setAttribute("aria-label", `Lien vers la page de :${name}` );
        lien.setAttribute("tabindex","3");
        
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("Alt", `photos du photographe ${name}`);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const div = document.createElement('div');
        div.setAttribute("class","align-information");
        div.setAttribute("tabindex","3");

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

function MediaFactory(media, nameOfPhotographe){
    //je recupère un tableau de clé des données 
        const props= Object.keys(media);

        const article = document.createElement("article");
        article.setAttribute("class","photograph-article");

        //je teste le type du media
        if (props[3]== "image"){
            const img = document.createElement("img");
            img.setAttribute("class", "media-img");
            img.setAttribute("src",`assets/images/${nameOfPhotographe}/${media.image}`);
            img.setAttribute("tabindex","7");
            article.appendChild(img);
        }
        else if (props[3]== "video"){
            const video = document.createElement("video");
            video.setAttribute("class", "media-img");
            video.setAttribute("tabindex","7");
            const source = document.createElement("source");
            source.setAttribute("src",`assets/images/${nameOfPhotographe}/${media.video}`);
            source.setAttribute("type","video/mp4");
            video.appendChild(source);
            article.appendChild(video);
        }
        const div = document.createElement("div");
        div.setAttribute("class","media-title");

        const pTitle = document.createElement("p");
        pTitle.setAttribute("class","title");
        pTitle.setAttribute("tabindex","7");
        pTitle.textContent = media.title;

        const divLikes = document.createElement("div");
        divLikes.setAttribute("class","media-likes");

        const pLikes = document.createElement("p");
        pLikes.setAttribute("class","likes")
        pLikes.setAttribute("tabindex","7");
        pLikes.textContent = media.likes;

        const iconHeart = document.createElement("i");
        iconHeart.setAttribute("class","fa-solid fa-heart");
        iconHeart.addEventListener("click",() => {
                  pLikes.innerHTML ++;
                  const AllLikes = document.getElementById("Likes");
                  AllLikes.innerHTML ++; 
                 });
       iconHeart.addEventListener("mouseenter",() => { 
            iconHeart.style.cursor = "pointer";    
            iconHeart.setAttribute("class","fa-solid fa-heart-circle-plus") });
       iconHeart.addEventListener("mouseleave",() => { 
            iconHeart.setAttribute("class","fa-solid fa-heart") });       

        divLikes.appendChild(pLikes);
        divLikes.appendChild(iconHeart);
        div.appendChild(pTitle);
        div.appendChild(divLikes);
        article.appendChild(div);

  return article;
}