class Cart {
    constructor(
        items,
        cartClass = 'cart',
        plusClass = 'plus',
        minusClass = 'minus',
        deleteClass = 'delete',
        currency = ''
    ) {
        this.items = items;
        this.cartClass = cartClass;
        this.plusClass = plusClass;
        this.minusClass = minusClass;
        this.deleteClass = deleteClass;
        this.currency = 'UAH';
    }

    goodsPlus(art) {
        this.items[art]['count']++;
    }

    goodsMinus(art) {
        if (this.items[art]['count'] - 1 == 0) {
            this.goodsDelete(art);
        } else {
            this.items[art]['count']--;
        }
    }

    goodsDelete(art) {
        delete this.items[art];
    }

    getTotal() {
        let total = 0;
        for (let key in this.items) {
            total += this.items[key]['price'] * this.items[key]['count'];
            return total;
        }
    }

    render() {
        //create table 
        let table = document.createElement('table');
        table.classList.add(this.cartClass);

        // create rows with items in basket
        for (let key in this.items) {
            //добавляю массив с item в переменную
            let goods = this.items[key];
            //create button delete
            const tr = document.createElement('tr');
            let td = document.createElement('td');
            let button = document.createElement('button');
            button.classList.add(this.deleteClass);
            button.classList.add('button-primary');
            button.innerHTML = "x";
            button.setAttribute("data-articul", key);
            td.append(button);
            tr.append(td);
            //add image
            td = document.createElement('td');
            let img = document.createElement('img');
            img.src = goods.image;
            td.append(img);
            tr.append(td);
            //делаем название товара
            td = document.createElement('td');
            let h4 = document.createElement('h4');
            h4.innerHTML = goods.name;
            td.append(h4);
            tr.append(td);
            //делаем кнопку минус
            td = document.createElement('td');
            button = document.createElement('button');
            button.classList.add(this.minusClass);
            button.classList.add('button-primary');
            button.innerHTML = "-";
            button.setAttribute('data-articul', key);
            td.append(button);
            tr.append(td);
            //делаем количество
            td = document.createElement('td');
            let span = document.createElement('span');
            span.innerHTML = goods.count;
            td.append(span);
            tr.append(td);
            //делаем кнопку добавить "+"
            td = document.createElement('td');
            button = document.createElement('button');
            button.classList.add(this.plusClass);
            button.classList.add('button-primary');
            button.innerHTML = "+"
            button.setAttribute('data-articul', key);
            td.append(button);
            tr.append(td);
            //добавляем total для одного товара
            td = document.createElement('td');
            span = document.createElement('span');
            span.innerHTML = goods.price * goods.count + ' ' + this.currency;
            td.append(span);
            tr.append(td);

            table.append(tr);// add tr to table
        }

        //create total for table
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.setAttribute('colspan', 7); // merge 7 td
        td.style.textAlign = 'right';
        td.innerHTML = '<span class="total">Total: </span>' + this.getTotal() + ' ' + this.currency; //рисуем вывод total
        tr.append(td);
        table.append(tr); //добавили строку total 
        return table;
    }

}