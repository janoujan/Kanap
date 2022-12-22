// un fetch et une boucle pour afficher les produits de l'API
fetch('http://localhost:3000/api/products/')
  .then(data => data.json())
  .then(jsonListProduct => {
    let contentToAdd = ''
    for (const jsonProduct of jsonListProduct) {
      contentToAdd += `<a href="./product.html?id=${jsonProduct._id} ">
                               <article>
                                 <img src="${jsonProduct.imageUrl}" alt="${jsonProduct.altTxt} ">
                                 <h3 class="productName">${jsonProduct.name} </h3>
                                 <p class="productDescription">${jsonProduct.description} </p>
                               </article>
                             </a>`
    }
    document.querySelector('section').innerHTML = contentToAdd
  })
  .catch(_error => { document.querySelector('section').innerHTML = '<h3>impossible de contacter le serveur</h3>' })
