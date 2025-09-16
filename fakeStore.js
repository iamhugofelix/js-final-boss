// Faz load dos dados da API: 'https://fakestoreapi.com/products'

async function getProducts() {
    const result = await fetch('https://fakestoreapi.com/products');
    const data = await result.json()

    displayProducts(data)
}

getProducts()

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
        button.addEventListener('click', () => {/*Add to Cart */})


        grid.appendChild(card);
    });

    // Remove this before sending
    console.log(data);
}

