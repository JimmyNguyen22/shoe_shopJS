window.onload = function () {
  // obj của es6 lấy dữ liệu trên param, location.search lấy phần sau ? của thẻ a
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("productid");
  // console.log('params', myParam)

  //Gọi API
  let promise = axios({
    url: "https://shop.cyberlearn.vn/api/Product/getbyid?id=" + myParam,
    method: "GET",
  });

  //Xử lý thành công
  promise.then(function (result) {
    let pd = result.data.content;
    // console.log('relatedProducts', pd.relatedProducts);
    // console.log("pd", pd);
    renderProduct(pd);
    //Tạo button Size giày
    renderBtn(pd.size);

    renderMoreProduct(pd.relatedProducts);
  });
  //Xử lý thất bại
  promise.catch(function (error) {
    console.log("loi", error);
  });
};

const renderProduct = (item) => {
  let product = ` <div class="product-img">
    <img src=${item.image} alt="">
</div>
<div class="product-desc">
    <h1>${item.name}</h1>
    <p class="desc">${item.description}</p>

    <div class="item-price">
        <span class="price-old">1.200.000đ</span>
        <span class="price-new">${item.price}.000đ</span>
    </div>

    <div class="select">
        <h3>Select size
        </h3>
        <div id="btn">

        </div>
    </div>

    <div class="quantity">
        <span>Số Lượng</span>
        <div class="quantity-btn" style="display:flex;">
          <button class="decline decrease">-</button>
          <input type="text" value="1" class="number">
          <button class="decline increase">+</button>
        </div>
        <h6>${item.quantity} sản phẩm có sẵn</h6>
    </div>
    <button class="addCart" >
        <i class='bx bx-cart-add'></i>
        Thêm vào giỏ hàng</button>
</div>`;
  document.querySelector(".product").innerHTML = product;

  const cartItem = document.querySelector(".cartItem");
  const addCart = document.querySelector(".addCart");
  const number = document.querySelector(".number");
  const btns = document.querySelectorAll(".decline");
  let count = 1;

  btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const value = e.currentTarget.classList;
      if (value.contains("decrease")) {
        count--;
      } else if (value.contains("increase")) {
        count++;
      } else {
        count = 1;
      }
      if (count < 1) {
        count = 1;
      }
      number.value = count;
    });
  });

  number.addEventListener("change", (event) => {
    count = event.target.value;
  });

  addCart.addEventListener("click", () => {
    cartItem.innerHTML = count;
    updateCartBox(cartItem);
    renderCart(item.image, item.name, item.price);
  });

  // set cart-box
  const cartBox = document.querySelector(".cart-box");
  const cartEmpty = document.querySelector(".cart-empty");
  const cartFull = document.querySelector(".cart-full");
  function updateCartBox(cartItem) {
    if (cartItem.innerHTML < 1) {
      cartEmpty.style.display = "block";
      cartFull.style.display = "none";
    } else {
      cartEmpty.style.display = "none";
      cartFull.style.display = "block";
    }
  }
  updateCartBox(cartItem);
};

const renderBtn = (btns) => {
  let btn = btns
    .map((item) => {
      return `  <button>${item}</button>`;
    })
    .join("");

  document.querySelector("#btn").innerHTML = btn;
};

const renderMoreProduct = (arr) => {
  let product = arr
    .map((item) => {
      return ` <div class="col-2-4">
    <!--  product item -->
    <a href="./detail.html?productid=${item.id}" class="product-item">
        <div class="item-img"
            style="background-image: url(${item.image});">
        </div>

        <h4 class="item-name">
           ${item.name}
        </h4>
        <div class="item-price">
            <span class="price-old">1.200.000đ</span>
            <span class="price-new">${item.price}.000đ</span>
        </div>
        <div class="item-action">
            <span class="item-rating">
                <i class='bx bxs-star'></i><i class='bx bxs-star'></i><i
                    class='bx bxs-star'></i><i class='bx bxs-star'></i><i
                    class='bx bxs-star'></i>
            </span>
            <span class="item-sold">Đã bán ${item.price}</span>
        </div>
        <div class="item-location">
            TP. Hồ Chí Minh
        </div>

        <div class="item-favourite">
            <i class='bx bx-check'></i>
            <span>Yêu thích</span>
        </div>
        <div class="item-sale">
            <span class="sale-percent">
                10%
            </span>
            <span class="sale-title">
                GIẢM
            </span>
        </div>
    </a>
</div>`;
    })
    .join("");

  document.querySelector("#product-item").innerHTML = product;
};

function renderCart(image, name, price) {
  let cartList = `
  <div class="cart-item">
  <img src=${image}
      alt="">
  <div class="cart-info">
      <h5>${name}</h5>11
      <span>₫${price}.000</span>
  </div>
</div>
  `.join("");

  document.querySelector(".cart-list").push(cartList).innerHTML;
}

