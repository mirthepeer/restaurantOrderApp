import { menuArray } from "./data.js";
let list = [];

document.addEventListener("click", (e) => {
  if (e.target.dataset.btn) {
    handleClick(e.target.dataset.btn);
  } else if (e.target.dataset.remove) {
    handleRemove(e.target.dataset.remove);
  } else if (e.target.id === "order-btn") {
    console.log(e.target.id);
    handleOrder();
  }
});

form.addEventListener("submit", handlePay);

function handleClick(menuid) {
  const targetObj = menuArray.filter((item) => {
    return item.id == menuid;
  })[0];
  list.push(targetObj);

  render();
}

function handleRemove(menuid) {
  list.splice(parseInt(menuid) - 1, 1);
  console.log(typeof menuid);
  console.log(list);
  render();
}

function handleOrder() {
  document.getElementById("payment").classList.remove("hide");
}

function handlePay(e) {
  list = [];
  render();
  e.preventDefault();
  document.getElementById("payment").classList.add("hide");
  document.getElementById("thanks").classList.remove("hide");
  document.getElementById("processing").classList.remove("hide");

  document.getElementById("customer").innerText =
    document.getElementById("name").value;

  setTimeout(() => {
    document.getElementById("processing").classList.add("hide");
    document.getElementById("appreciation").classList.remove("hide");
  }, 3500);
}
const getOrderHtml = (order) => {
  let id = 0;
  let total = 0;
  let orderhtml = "";

  for (let item of order) {
    total += item.price;
    document.getElementById("total").textContent = `$${total}`;
    document.getElementById("pay-amount").textContent = `$${total}`;
    orderhtml += `
                <div class='order-summary'>
                    <div class='order-review flex'>
                        <p>${item.name}</p>
                        <button id=${
                          item.id
                        } data-remove=${(id += 1)}>remove</button>
                    </div>
                    <p class='item-price'>$${item.price}</p>
                </div>


       `;
    console.log(total);
  }
  return orderhtml;
};

const getPageHtml = (data) => {
  let html = "";
  for (let item of data) {
    html += `
        <div class='item'>
            <div class='item-info'>
                <div class='item-img'>
                    <p>${item.emoji}</p>
                </div>
                <div class='item-details'>
                    <h3>${item.name}</h3>
                    <p>${item.ingredients}</p>
                    <h4>$${item.price}</h4>
                </div>
            </div>
            <div class='btn'>
            <button id=${item.id} data-btn= ${item.id}>+</button>

            </div>
    
        </div>
           
`;
  }

  return html;
};

const render = () => {
  if (list.length > 0) {
    document.getElementById("list").classList.remove("hide");
  } else {
    document.getElementById("list").classList.add("hide");
  }
  document.getElementById("menu").innerHTML = getPageHtml(menuArray);
  document.getElementById("order").innerHTML = getOrderHtml(list);
};
// console.log('hi')

render();
