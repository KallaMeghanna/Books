document.addEventListener("DOMContentLoaded", function () {
    fetchProducts();
});

function openCategory(evt, category) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(category).style.display = "block";
    evt.currentTarget.className += " active";
}

async function fetchProducts() {
    const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
    const data = await response.json();
    
    // Men's products
    const menProducts = document.getElementById('menProducts');
    data.men.forEach(product => {
        menProducts.innerHTML += `
            <div class="product">
                <img src="${product.image}" alt="${product.title}">
                <div class="product-info">
                    <div class="badge">${product.badge}</div>
                    <div class="product-title">${product.title}</div>
                    <div class="vendor">${product.vendor}</div>
                    <div class="price">Rs${product.price}</div>
                    <div class="compare-price">Compare at Rs${product.compareAtPrice}</div>
                    <div class="discount">${calculateDiscount(product.price, product.compareAtPrice)}% off</div>
                    <button class="add-to-cart-button">Add to Cart</button>
                </div>
            </div>
        `;
    });

    // Women's products
    const womenProducts = document.getElementById('womenProducts');
    data.women.forEach(product => {
        womenProducts.innerHTML += `
            <div class="product">
                <img src="${product.image}" alt="${product.title}">
                <div class="product-info">
                    <div class="badge">${product.badge}</div>
                    <div class="product-title">${product.title}</div>
                    <div class="vendor">${product.vendor}</div>
                    <div class="price">Rs${product.price}</div>
                    <div class="compare-price">Compare at Rs${product.compareAtPrice}</div>
                    <div class="discount">${calculateDiscount(product.price, product.compareAtPrice)}% off</div>
                    <button class="add-to-cart-button">Add to Cart</button>
                </div>
            </div>
        `;
    });
}

function calculateDiscount(price, compareAtPrice) {
    return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}
