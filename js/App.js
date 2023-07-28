let prueba = document.getElementById('pruebaDom');
let shoppingCart = JSON.parse(localStorage.getItem('cart')) || [];
const showCart = document.getElementById('shopping-cart');
const modalContainer = document.getElementById('modal-container');
const counterCart = document.getElementById('counter');

products.forEach(product => {
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
        cartCounter();
        saveCartStorage();
    });
});

const saveCartStorage = () => {
localStorage.setItem('cart', JSON.stringify(shoppingCart))
};

const storage = JSON.parse(localStorage.getItem('cart'))
