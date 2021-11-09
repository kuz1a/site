const cart = () => {
    const buttonCart = document.getElementById('cart-button');
    const modalCart = document.querySelector('.modal-cart');
    const close = modalCart.querySelector('.close');
    const body = modalCart.querySelector('.modal-body');
    const priceTag = modalCart.querySelector('.modal-pricetag');
    const buttonSend = modalCart.querySelector('.button-primary');
    const clearCart = modalCart.querySelector('.clear-cart');

    const resetCart = () => {
        body.innerHTML = '';
        priceTag.innerHTML = '0 ₽';
        localStorage.removeItem('cart');
        modalCart.classList.remove('is-open');

    }
    const cancelCart = () => {
        body.innerHTML = '';
        // priceTag.innerHTML = '0 ₽';
        localStorage.removeItem('cart');
        modalCart.classList.remove('is-open');
    }
    const allPrice = (arr) => {
        let sum = arr.reduce((sum, {price, count}) => sum + price * count, 0);
        priceTag.innerHTML = '';
        priceTag.innerHTML = `${sum} ₽`;
    }


    const incrementCount = (id) => {
        const cartArray = JSON.parse(localStorage.getItem('cart'))
        cartArray.map((item) => {
            if (item.id === id) {
               item.count++
            }
            return item;
        })

        localStorage.setItem('cart', JSON.stringify(cartArray));
        allPrice(cartArray)
        renderItems(cartArray);
    }
    const decrementCount = (id) => {
        const cartArray = JSON.parse(localStorage.getItem('cart'))

        cartArray.map((item) => {
            if (item.id === id) {
                item.count = item.count > 1 ? item.count - 1 : 1;
            }
            return item;
        })

        localStorage.setItem('cart', JSON.stringify(cartArray));
        allPrice(cartArray);
        renderItems(cartArray);

    }

    const renderItems = (data) => {
        body.innerHTML = '';
        allPrice(data)
        data.forEach(({name, price, id, count}) => {
            const foodRow = document.createElement('div');

            foodRow.classList.add('food-row');
            foodRow.innerHTML = `
            \t<span class="food-name">${name}</span>
\t\t\t\t\t<strong class="food-price">${price} ₽</strong>
\t\t\t\t\t<div class="food-counter">
\t\t\t\t\t\t<button class="counter-button btn-dec" data-index="${id}">-</button>
\t\t\t\t\t\t<span class="counter">${count}</span>
\t\t\t\t\t\t<button class="counter-button btn-inc" data-index="${id}">+</button>
\t\t\t\t\t</div>
            `;

            body.append(foodRow);

        })

    }


    body.addEventListener('click', (e) => {
        e.preventDefault();

        if (e.target.classList.contains('btn-inc')) {
            incrementCount(e.target.dataset.index)
        } else if (e.target.classList.contains('btn-dec')) {
            decrementCount(e.target.dataset.index)
        }
    })

    buttonSend.addEventListener('click', () => {
        const cartArray = localStorage.getItem('cart');
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: cartArray
        })
            .then(response => {
                if (response.ok) {
                    resetCart();
                    window.location.reload();
                }

            })
            .catch( e => {
                console.error(e);
            })

    })

    clearCart.addEventListener('click', () => {
        cancelCart();
    })

    buttonCart.addEventListener('click', function (){
        if (localStorage.getItem('cart')) {
            renderItems(JSON.parse(localStorage.getItem('cart')));
        }
        modalCart.classList.add('is-open');
    })
    close.addEventListener('click', () => {
        modalCart.classList.remove('is-open');
    })
}

cart()
