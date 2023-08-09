let prueba = document.getElementById('pruebaDom');
let shoppingCart = JSON.parse(localStorage.getItem('cart')) || [];
const showCart = document.getElementById('shopping-cart');
const modalContainer = document.getElementById('modal-container');
const counterCart = document.getElementById('counter');

function printProducts(chosenProducts) {

    prueba.innerHTML = "";

    chosenProducts.forEach(product => {
    let div = document.createElement('div');
    div.className = "card";
    div.innerHTML = `
    <p>${product.name}</p>
    <img src="${product.img}"/>
    <p>Precio: $${product.price}</p>
    `
    prueba.appendChild(div);

    let add = document.createElement('button');
    add.innerHTML = "Añadir al carrito";

    div.append(add);

    add.addEventListener('click', () => {

        const repeatedProduct = shoppingCart.find((prod) => prod.id === product.id);
        if(repeatedProduct){
            repeatedProduct.amount++;
            printCart();
        } else{
            shoppingCart.push({
            id: product.id,
            img: product.img,
            name: product.name,
            price: product.price,
            amount: product.amount,
        });
        printCart();
    };
    Toastify({
        text: "Añadido al carrito!",
        duration: 2000,
        gravity: "bottom",
        position: "right",
        style: {
        background: "linear-gradient(to right, rgb(17, 209, 145), rgb(11, 160, 11))",
        border: "2px solid white",
        }
    }).showToast();
        cartCounter();
        saveCartStorage();
    });
})};

printProducts(products);

const saveCartStorage = () => {
localStorage.setItem('cart', JSON.stringify(shoppingCart))
};

const storage = JSON.parse(localStorage.getItem('cart'))

const categoryButtons = document.querySelectorAll(".filter-button");

categoryButtons.forEach(button => {
    button.addEventListener("click", (e) =>{
        categoryButtons.forEach(button => button.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if(e.currentTarget.id != "todos"){
        const buttonProducts = products.filter(product => product.type === e.currentTarget.id)
        printProducts(buttonProducts);
        } else{
            printProducts(products)
        }
    })
})
