if (localStorage.getItem('cart')) {
    const cart = JSON.parse(localStorage.getItem('cart')); // парсим данные из localStorage
    let shopCart = new Cart(cart); //cart - массив товаров в массиве
    console.log(cart)
    let cartOut = document.querySelector('.cart-out'); // куда выводить таблицу-корзину

    // функция для обновления корзины после нажатия кнопки для упрощения кода
    function reloadBasket() {
        cartOut.innerHTML = ''; // очищаем вывод 
        cartOut.append(shopCart.render());// рисую корзину
        localStorage.setItem('cart', JSON.stringify(shopCart.item)); // обновляем localStorage;
    }
    reloadBasket();

    cartOut.addEventListener('click', (event) => {
        let target = event.target; // объект на который кликнули

        //Проверяем на какую кнопку кликнули
        if (target.classList.contains('delete')) {
            shopCart.goodsDelete(target.dataset['articul']); // вызываю метод класса по удалению и указываем аргумент art
            reloadBasket(); // очищаем и перерисовываем корзину с обновленными данными 
            return true;
        } else if (target.classList.contains('plus')) {
            shopCart.goodsPlus(target.dataset['articul']);
            reloadBasket();
            return true;
        } else if (target.classList.contains('minus')) {
            shopCart.goodsMinus(target.dataset['articul']);
            reloadBasket();
            return true;
        }
    });

}