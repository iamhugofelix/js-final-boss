// Faz load dos dados da API: 'https://fakestoreapi.com/products'

async function getProducts() {
    const result = await fetch('https://fakestoreapi.com/products');
    const data = await result.json()

    displayProducts(data)
}

getProducts()


// Criar dinamicamente uma grelha de produtos, utilizando o nome e imagem dos produtos carregados;

function displayProducts(data) {
    const grid = document.querySelector('.product-grid');

    data.forEach(item => {
        let card = document.createElement('div');
        let ratingDisplay = '';

        if (item.rating.rate >= 0 && item.rating.rate < 1) {
            ratingDisplay = "";
        } else if (item.rating.rate >= 1 && item.rating.rate < 1.5) {
            ratingDisplay = "⭐️";
        } else if (item.rating.rate >= 1.5 && item.rating.rate < 2.5) {
            ratingDisplay = "⭐️⭐️";
        } else if (item.rating.rate >= 2.5 && item.rating.rate < 3.5) {
          ratingDisplay = "⭐️⭐️⭐️";
        } else if (item.rating.rate >= 3.5 && item.rating.rate < 4.5) {
          ratingDisplay = "⭐️⭐️⭐️⭐️";
        } else {
          ratingDisplay = "⭐️⭐️⭐️⭐️⭐️";
        }

        card.innerHTML = `
        <div class="product-card">
                <div class="card-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="card-details">
                    <h3>${item.title}</h3>
                    <span>${ratingDisplay} ${Math.round(item.rating.rate)} (${
          item.rating.count
        } Reviews)</span>
                    <span class="card-price">${item.price}€</span>
                </div>
                <div class="card-actions">
                        <button class="btn">Add to Cart</button>
                </div>
            </div>`;

        const button = card.querySelector('button');
        button.addEventListener('click', () => {addToCart(item.id)})


        grid.appendChild(card);
    });

}


//Adicionalmente, a cada produto deve ser gerado um botão com o texto “Add to cart”. Este botão deverá ter uma função ao ser clicado que adiciona um produto ao carrinho. Para isso usem o endpoint: Enviar para o endpoint https://fakestoreapi.com/carts/7 e o method deverá ser de update (PUT);

function addToCart(productId) {

    let today = new Date().toISOString().split('T')[0];

    let cartData = {
      userId: 1,
      date: today,
      products: [
        {
          productId: productId,
          quantity: 1
        },
      ],
    };

    fetch('https://fakestoreapi.com/carts/7', {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartData)
    })
    .then(result => result.json())
    .then(data => {
        console.log(data);
        alert('Product added to cart')
    })
}

const footer = document.getElementById('footer');
footer.innerText = `Copyright © ${new Date().getFullYear()}`

