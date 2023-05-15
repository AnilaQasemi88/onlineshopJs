//PRODUKTE DEFINIEREN ZUM LESEN INFOS***************************************************************************************************
const products = [
    {
      id: 1,
      name: "Kids Collective",
      price: 890,
      Image: "./img/produktbild-2.jpg",
    },
    {
      id: 2,
      name: "JVmoebel Kinderbett",
      price: 1.899,
      Image: "./img/produktbild-3.jpg",
    },
    {
      id: 3,
      name: "360Home Kinderbett",
      price: 853, 
      Image: "./img/produktbild-4.jpg",
    },
    {
      id: 4,
      name: "Feldmann-Wohnen Hochbett",
      price: 1.361, 
      Image: "./img/produktbild-5.jpg",
    },
    {
      id: 5,
      name: "bibex Hochbett",
      price: 1.505, 
      Image: "./img/produktbild-6.jpg",
    },
    {
      id: 6,
      name: "Qian Auto Kinderbett",
      price: 1.018, 
      Image: "./img/produktbild-7.jpg",
    },
  ];


//*************************************************************************************************************************** */
// ZUM Zeigen alle Infos
let counter = document.getElementById('cart-counter');
const renderProducts = () => {
    const productDiv = document.querySelector(".products");
    // productDiv.innerHTML = ""; // von Anfang ist leer
    
    // retrieving from local storage
    let cart = JSON.parse(localStorage.getItem("cart")) || { items: [] }; //initializing empty cart if there's nothing in LocalStorage
    products.forEach((item, index) => { // Item: Zähler und index: Der Ort, an dem sie gespeichert werden (0, 1, 2 ,...)
        productDiv.innerHTML += `<div class="product card"> <div class="product-image"> <img src=${item.Image}> </div> <h2 class="product-title">${item.name}</h2> <h3 class="product-price">${item.price} €</h3> <button class="btn btn-warning bg-light add-to-cart" onclick= "addToCart(${index})">in den Warenkorb legen</button> </div>` ; //addToCart() hat ein Argument und kann nicht leer sein
    });
    let totalMenge = cart.items.reduce((acc, curr) => acc + curr.menge, 0);
    counter.innerText = totalMenge;  
};


//SHOPPING CART***************************************************************************************************
const renderCartItems = () => {
    const cartDiv = document.querySelector(".cart-items");
    cartDiv ? cartDiv.innerHTML= '': "";
    
    const totalPriceEl = document.querySelector(".cart-total-price");
    let totalPrice= 0;

    // Load cart from local storage
    cart = JSON.parse(localStorage.getItem("cart")) || { items: [], total: 0 };
    if(cart.items.length == 0){ // wenn es keine Produkte im Warenkorb gibt
        cartDiv.innerHTML = 'Es befinden sich keine Produkte im Warenkorb';
    }

    cartDiv ? cart.items.forEach((item) =>{
        totalPrice += item.total;
        cartDiv.innerHTML += `
        <div class="cart-item">
            <div class="col-md-4">
                <div class="cart-item-title">${item.name}</div>
            </div>
            <div class="col-md-4 p-8">
                <div class="Menge">${item.menge}</div>
            </div>
            <div class="col-md-4">
                <button class="btn btn-warning bg-light" onclick= "removeFromCart('${item.name}')">Entfernen</button> 
            </div>
        </div>
        `
    }): "";
    totalPriceEl ? totalPriceEl.innerHTML = `Gesamt: ${totalPrice} €`: ""; 
}


//ADD TO CART***************************************************************************************************
const addToCart = (productIndex) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || { items: [] }; 
    const product = products[productIndex];
    let existingProduct = false;
    let newCartItems = cart.items.reduce((state, item) => {
        if(item.name === product.name){
            existingProduct = true;
            return [...state, {...item, menge: item.menge + 1, total: (item.menge + 1) * item.price }];
        }else{
            return [...state, item];
        }
    }, []);
    if(!existingProduct) newCartItems = [...newCartItems, {...product, menge: 1, total: product.price}];
    cart.items = newCartItems;
    cart.total = cart.items.reduce((a,b) => a + b.total, 0);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderProducts();
    renderCartItems();
};



// REMOVE FROM CART***************************************************************************************************
const removeFromCart = (productName) => {
    let newCartItems = cart.items.reduce((state, item) => {
        if( item.name === productName){
            const newItem = {
                ...item,
                menge: item.menge - 1,
                total: (item.menge - 1) * item.price,
            }

            if(newItem.menge > 0) {
                return [...state, newItem]
            }else{
                return state;
            }
        }
        return [...state, item];
    },[])
    cart = {
        ...cart,
        items: newCartItems
    }
    localStorage.removeItem('cart');
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems(); 
}

// SLIDESHOW IN HOMEPAGE***************************************************************************************************
let slideIndex = [1,1];
let slideId = ["mySlides1", "mySlides2"]
showSlides(1, 0);
showSlides(1, 1);
        
function plusSlides(n, no) {
    showSlides(slideIndex[no] += n, no);
}
        
function showSlides(n, no) {
    let i;
    let x = document.getElementsByClassName(slideId[no]);
    if (n > x.length)
        {slideIndex[no] = 1}
    if (n < 1)
    {slideIndex[no] = x.length}
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";  
    }
    x[slideIndex[no]-1].style.display = "block";  
}


//SCROLL NACH OBEN***************************************************************************************************

// Get the button
let mybutton = document.getElementById("myBtn");

/* // When the user scrolls down 5px from the top of the document, show the button
window.onscroll = function() {
    scrollFunction()
};

function scrollFunction() {
  if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
} */

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}