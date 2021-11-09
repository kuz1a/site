const partners = () => {
    const cardsRestaurants = document.querySelector('.cards-restaurants');


    fetch('https://delivery-food-e2bb4-default-rtdb.firebaseio.com/db/partners.json')
        .then((response) => response.json())
        .then((data) => renderItems(data))
        .catch((error) => {
            console.log(error)
        })
    console.log(cardsRestaurants);
    const renderItems = (data) => {
        data.forEach((item) => {
            const {image, kitchen, name, price, products, stars, time_of_delivery} = item;
            const card = document.createElement('a');
            card.setAttribute('href', 'restaurant.html');
            card.classList.add('card');
            card.classList.add('card-restaurant');
            card.dataset.products = products;
            card.innerHTML = `
       <img src="${image}" alt="${name}" class="card-image" />
<div class="card-text">
<div class="card-heading">
<h3 class="card-title">${name}</h3>
<span class="card-tag tag">${time_of_delivery} мин</span>
</div>
<div class="card-info">
<div class="rating">
${stars}
</div>
<div class="price">От ${price} ₽</div>
<div class="category">${kitchen}</div>
</div>
</div>
       `;
            card.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.setItem('restaurant', JSON.stringify(item))
                window.location.href = 'restaurant.html'
            })
            cardsRestaurants.append(card);
        })

    }
}
partners();
