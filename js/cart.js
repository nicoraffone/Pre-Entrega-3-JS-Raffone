
    const printCart = () => {
    modalContainer.innerHTML = '';
    modalContainer.style.display = 'flex';
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    modalHeader.innerHTML = `
    <h1 class="modal-title">Carrito de compras</h1>
    `;
    modalContainer.append(modalHeader);

    const modalbutton = document.createElement('h1');
    modalbutton.innerText = "x";
    modalbutton.className = "modal-header-button";

    modalbutton.addEventListener('click', () => {
        modalContainer.style.display = 'none';
    });

    modalHeader.append(modalbutton);

    shoppingCart.forEach((product) => {
    let cartContent = document.createElement('div');
    cartContent.className = 'modal-content';
    cartContent.innerHTML = `
    <span class="deleteProduct">❌</span>
    <img class="cartImage" src="${product.img}">
    <h3>${product.name}</h3>
    <p>$${product.price}</p>
    <p>x ${product.amount} Unidad/es</p>
    <span class="less">➖</span>
    <span class="plus">➕</span>
    `;

    modalContainer.append(cartContent);

    let less = cartContent.querySelector('.less');
    let plus = cartContent.querySelector('.plus');

    less.addEventListener('click', () => {
        if(product.amount !== 1){
        product.amount--
        saveCartStorage();
        printCart()
            };
        });

    plus.addEventListener('click', () => {
        product.amount++
        saveCartStorage();
        printCart();
        });

    let deleteProduct = cartContent.querySelector('.deleteProduct');

    deleteProduct.addEventListener('click', () => {
        deleteItem(product.id);
        });
});

    const total = shoppingCart.reduce((acc, product) => acc + product.price * product.amount, 0);

    const totalBuy = document.createElement('div');
    totalBuy.className = 'total-content';
    totalBuy.innerHTML = `Total: $${total}`;
    modalContainer.append(totalBuy);
    
    const buyButton = document.createElement('button');
    buyButton.className = 'buyButton';
    buyButton.innerText = 'Comprar';
    modalContainer.append(buyButton);

    buyButton.addEventListener('click', () => {
        Toastify({
            text: "Gracias por su compra!",
            duration: 3000,
            gravity: "bottom",
            position: "center",
            style: {
            background: "rgb(65, 141, 30)",
            border: "3px solid white",
            }}).showToast();
    });


    const emptyButton = document.createElement('button');
    emptyButton.className = 'emptyButton';
    emptyButton.innerText = 'Vaciar carrito';
    modalContainer.append(emptyButton);


    emptyButton.addEventListener('click', () => {
        if(shoppingCart.length >= 1){
        Swal.fire({
            title: 'Esta seguro?',
            text: `Va a vaciar el carrito de compras!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: 'rgba(204, 16, 2, 0.89)',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Productos eliminados',
                `Carrito de compras vacio`,
                'success'
            )
            emptyCart();
            cartCounter();
            saveCartStorage();
            printCart();
        }
        })
    }})
};

showCart.addEventListener('click', printCart)

//! FUNCION PARA ELIMINAR PRODUCTOS DEL CARRITO
const deleteItem = (deleteId) => {
    const foundId = shoppingCart.find((product) => product.id === deleteId);

    shoppingCart = shoppingCart.filter((shoppingCartId) => {
        return shoppingCartId !== foundId;
    });

    cartCounter();
    saveCartStorage();
    printCart();
};

//! FUNCION PARA MOSTRAR CONTADOR DE PRODUCTOS AGREGADOS SOBRE EL CARRITO
const cartCounter = () => {
    counterCart.style.display = 'block';
    counterCart.innerText = shoppingCart.length;

    const cartLength = shoppingCart.length;

    localStorage.setItem('cartLength', JSON.stringify(cartLength));

    counterCart.innerText = JSON.parse(localStorage.getItem('cartLength'));

    if(shoppingCart.length === 0){
        counterCart.style.display = 'none';
    };
};

//! FUNCION PARA VACIAR CARRITO DE COMPRAS
const emptyCart = () =>{
    shoppingCart = [];
    cartCounter();
    saveCartStorage();
    printCart();
};

cartCounter();