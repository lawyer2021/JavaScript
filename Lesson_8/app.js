'use strict';

let fitlerPopup = document.querySelector('.filterPopup');
let fitlerLabel = document.querySelector('.filterLabel');
let filterIcon = document.querySelector('.filterIcon');

fitlerLabel.addEventListener('click', function() {
    fitlerPopup.classList.toggle('hidden');
    fitlerLabel.classList.toggle('filterLabelPink');
    filterIcon.classList.toggle('filterIconPink');

    if (filterIcon.getAttribute('src') === 'images/filter.svg') {
        filterIcon.setAttribute('src', 'images/filterHover.svg')
    } else {
        filterIcon.setAttribute('src', 'images/filter.svg')
    }
});

let filterHeaders = document.querySelectorAll('.filterCategoryHeader');
filterHeaders.forEach(function(header) {
    header.addEventListener('click', function(event) {
        event.target.nextElementSibling.classList.toggle('hidden');
    })
});

let filterSizes = document.querySelector('.filterSizes');
let filterSizeWrap = document.querySelector('.filterSizeWrap');
filterSizeWrap.addEventListener('click', function() {
    filterSizes.classList.toggle('hidden');
});



const qntGoodsElm = document.querySelector(".cartIconWrap span")
const basketTotalValueElm = document.querySelector(".basketTotalValue")
console.log(basketTotalValueElm)
const basketTotalEl = document.querySelector(".basketTotal")

const cartElm = document.querySelector(".cartIconWrap")

const basketHidden = document.querySelector(".basket")
cartElm.addEventListener("mouseover", () => basketHidden.classList.remove("hidden"))
cartElm.addEventListener("mouseleave", () => basketHidden.classList.add("hidden"))

const goodsAdding = {};
let sum = 0;
let qntGoods = 0;
console.log(goodsAdding.id);
const buttonAddElm = document.querySelectorAll(".featuredItem");
// console.log(buttonAddElm)
// Функция подсчета количества и суммы
// function accounting() {
//     goodsAdding.id = this.dataset.id;
//     goodsAdding.name = buttonAddElm.dataset.name;
//     goodsAdding.price = buttonAddElm.dataset.price;
//     goodsAdding.qnt++;
//     goodsAdding.amount = goodsAdding.qnt * goodsAdding.price
// };

// buttonAddElm.addEventListener("click", accounting);
console.log(buttonAddElm)

function adding(id, name, price) {
    if (!(id in goodsAdding))
        goodsAdding[id] = {
            id: id,
            name: name,
            price: price,
            qnt: 0,
            amnt: 0
        }
    ++goodsAdding[id].qnt;
    goodsAdding[id].amnt = goodsAdding[id].qnt * goodsAdding[id].price;
    console.log(goodsAdding[id].qnt);
    console.log(goodsAdding[id].amnt);
    sum += goodsAdding[id].amnt;
    console.log(`sum = ${sum}`);
    ++qntGoods;
    console.log(`qntGoods ${qntGoods}`)
    qntGoodsElm.textContent = qntGoods
    basketTotalValueElm.textContent = sum
    productRend(id)
}

buttonAddElm.forEach((item) => {
    item.addEventListener("click", (event) => {
        if (event.target.tagName != "BUTTON") {
            return
        }
        const id = item.dataset.id;
        const name = item.dataset.name;
        const price = item.dataset.price;
        adding(id, name, price);
    })
})

// function productRend(id) {
//     const testRow = basketHidden.querySelector(`.basketRow[data-id="${id}"]`);
//     if (!testRow) {
//         markupProduct(id);
//         return
//     }
// }
function productRend(id) {
    markupProduct(id);
    return
}

function markupProduct(product) {
    const productRow = `
    <div class="basketRow" data-id="${product}">
      <div>${goodsAdding[product].name}</div>
      <div>
        <span class="productCount">${goodsAdding[product].qnt}</span> шт.
      </div>
      <div>$${goodsAdding[product].price}</div>
      <div>
        $<span class="productTotalRow">${(goodsAdding[product].price * goodsAdding[product].qnt)}</span>
      </div>
    </div>
    `;
    basketTotalEl.insertAdjacentHTML("beforebegin", productRow)
}

