//PRODUKTE DEFINIEREN***************************************************************************************************
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
// Zeigt alle Infos
const renderProducts = () => {
    const productDiv = document.querySelector(".products");
    productDiv.innerHTML = ""; // von Anfang ist leer
    
    // retrieving from local storage
    let cart = JSON.parse(localStorage.getItem("cart")) || { items: [] }; //initializing empty cart if there's nothing in LocalStorage
    products.forEach((item, index) => { // Item: Zähler und index: Der Ort, an dem sie gespeichert werden (0, 1, 2 ,...)
    productDiv.innerHTML += `<div class="product card"> <div class="product-image"> <img src=${item.Image}> </div> <h2 class="product-title">${item.name}</h2> <h3 class="product-price">${item.price} €</h3> <button class="btn btn-warning bg-light" onclick= "addToCart(${index})">in den Warenkorb legen</button> </div>` ; //addToCart() hat ein Argument und kann nicht leer sein
    });
    };
    
    let cart = JSON.parse(localStorage.getItem("cart")) || { items: [], total: 0 }; // Weil die Informationen zusammengetragen werden


//SHOPPING CART***************************************************************************************************
const renderCartItems = () => {
    const cartDiv = document.querySelector(".cart-items");
    cartDiv.innerHTML= '';
    
    const totalPriceEl = document.querySelector(".cart-total-price");
    let totalPrice= 0;

    // Load cart from local storage
    cart = JSON.parse(localStorage.getItem("cart")) || { items: [], total: 0 };
    if(cart.items.length == 0){ // wenn es keine Produkte im Warenkorb gibt
        cartDiv.innerHTML = 'Es befinden sich keine Produkte im Warenkorb';
    }

    cart.items.forEach((item) =>{
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
                <button class="btn btn-danger" onclick= "removeFromCart('${item.name}')">Entfernen</button> 
            </div>
        </div>
        `
    })

    totalPriceEl.innerHTML = `Gesamt: ${totalPrice} €`
}


//ADD TO CART***************************************************************************************************
const addToCart = (productIndex) => {
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
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems(); 
}
  

renderProducts();
renderCartItems();



