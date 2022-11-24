//faire une classe produit 
class Product{
  constructor(jsonListProduct) {
    jsonListProduct && Object.assign(this, jsonListProduct);
}
};

//verifer que la boucle du fetch ajoute autant de produit que ceux dans la class Produit
fetch("http://localhost:3000/api/products/")
.then(data => data.json())
.then(jsonListProduct => {
    console.log(jsonListProduct);
     for (let jsonProduct of jsonListProduct) {
         let product = new Product(jsonListProduct);
         let contentToAdd = `<a href="./product.html?id=${jsonProduct._id} ">
                               <article>
                                 <img src="${jsonProduct.imageUrl} " alt="${jsonProduct.altTxt} ">
                                 <h3 class="productName">${jsonProduct.name} </h3>
                                 <p class="productDescription">${jsonProduct.description} </p>
                               </article>
                             </a>`;
         document.querySelector("section").innerHTML += contentToAdd;                                           
    }
});

//tester qu'au click sur le produit la page du produit s'affiche