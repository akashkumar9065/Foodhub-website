// ===============================
// FOODHUB - script.js
// ===============================

// ---------- SEARCH ----------

const searchBox = document.getElementById("searchBox");
const searchFood = document.getElementById("searchFood");

if (searchBox) {

    searchBox.addEventListener("keyup", function () {

        let value = this.value.toLowerCase();

        let foods = document.querySelectorAll(".food-card");

        foods.forEach(food => {

            let name = food.querySelector("h3").textContent.toLowerCase();

            if (name.includes(value)) {
                food.style.display = "block";
            } else {
                food.style.display = "none";
            }

        });

    });

}

if (searchFood) {

    searchFood.addEventListener("keyup", function () {

        let value = this.value.toLowerCase();

        let menu = document.querySelectorAll(".menu-card");

        menu.forEach(item => {

            let name = item.querySelector("h3").textContent.toLowerCase();

            if (name.includes(value)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }

        });

    });

}
// ---------- ADD TO CART (Dynamic LocalStorage) ----------

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const addButtons = document.querySelectorAll(".food-card button, .menu-card button");

addButtons.forEach(button => {

    button.addEventListener("click", function () {

        const card = this.parentElement;

        const name = card.querySelector("h3").innerText;

        let priceText = "";

        if (card.querySelector("h4")) {

            // Menu page
            priceText = card.querySelector("h4").innerText;

        } else {

            // Index page
            priceText = card.querySelector("p").innerText;

        }

        const price = Number(priceText.replace(/[^\d]/g, ""));

        const existing = cart.find(item => item.name === name);

        if (existing) {

            existing.quantity++;

        } else {

            cart.push({
                name: name,
                price: price,
                quantity: 1
            });

        }

        localStorage.setItem("cart", JSON.stringify(cart));

        alert(name + " added to cart.");

    });

});
// ---------- LOAD CART ----------

function loadCart() {

    const tbody = document.querySelector("tbody");

    if (!tbody) return;

    cart = JSON.parse(localStorage.getItem("cart")) || [];

    tbody.innerHTML = "";

    let subtotal = 0;
    let totalItems = 0;

    if (cart.length === 0) {

        tbody.innerHTML = `
        <tr>
            <td colspan="5">🛒 Your Cart is Empty</td>
        </tr>`;

        updateSummary(0, 0);

        return;
    }

    cart.forEach((item, index) => {

        const total = item.price * item.quantity;

        subtotal += total;

        totalItems += item.quantity;

        tbody.innerHTML += `
        <tr>
            <td>${item.name}</td>
            <td>₹${item.price}</td>
            <td>
                <input type="number"
                    value="${item.quantity}"
                    min="1"
                    onchange="changeQty(${index}, this.value)">
            </td>
            <td>₹${total}</td>
            <td>
                <button onclick="removeItem(${index})">
                    Remove
                </button>
            </td>
        </tr>
        `;

    });

    updateSummary(totalItems, subtotal);

}
// ---------- UPDATE SUMMARY ----------

function updateSummary(items, subtotal) {

    const delivery = items > 0 ? 40 : 0;

    const total = subtotal + delivery;

    const spans = document.querySelectorAll(".bill-summary span");

    if (spans.length >= 3) {

        spans[0].innerText = items;
        spans[1].innerText = "₹" + subtotal;
        spans[2].innerText = "₹" + delivery;

    }

    const totalText = document.querySelector(".bill-summary h3");

    if (totalText) {

        totalText.innerText = "Total : ₹" + total;

    }

}

loadCart();

// ---------- CHANGE QUANTITY ----------

function changeQty(index, qty) {

    qty = Number(qty);

    if (qty < 1) qty = 1;

    cart[index].quantity = qty;

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();

}
// ---------- REMOVE ITEM ----------

function removeItem(index) {

    if (confirm("Remove this item from cart?")) {

        cart.splice(index, 1);

        localStorage.setItem("cart", JSON.stringify(cart));

        loadCart();

    }

}

// ---------- LOGIN ----------

const loginForm = document.querySelector(".login-box form");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        alert("Login Successful!");

        window.location.href = "index.html";

    });

}

// ---------- SIGNUP ----------

const signupForm = document.querySelector(".signup-box form");

if (signupForm) {

    signupForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const password = signupForm.querySelectorAll("input")[3].value;

        const confirmPassword = signupForm.querySelectorAll("input")[4].value;

        if (password !== confirmPassword) {

            alert("Passwords do not match!");

            return;

        }

        alert("Account Created Successfully!");

        window.location.href = "login.html";

    });

}
// ---------- CONTACT ----------

const contactForm = document.querySelector(".contact-form form");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        alert("Thank you! Your message has been sent.");

        contactForm.reset();

    });

}
// ---------- HERO ----------

const heroBtn = document.querySelector(".btn");

if (heroBtn) {

    heroBtn.addEventListener("click", function () {

        console.log("FoodHub Loaded");

    });

}

// ---------- SCROLL TO TOP ----------

window.addEventListener("scroll", function () {

    if (window.scrollY > 200) {

        console.log("Scrolling...");

    }

});

// ---------- SIMPLE FADE ANIMATION ----------

const cards = document.querySelectorAll(
    ".food-card, .menu-card, .card, .review, .why-box"
);

cards.forEach(card => {

    card.addEventListener("mouseenter", function () {

        card.style.transform = "scale(1.05)";

    });

    card.addEventListener("mouseleave", function () {

        card.style.transform = "scale(1)";

    });

});

// ---------- CURRENT YEAR ----------

const footer = document.querySelector("footer");

if (footer) {

    console.log("FoodHub Website Loaded Successfully");

}

// popular resturent section

function openRestaurant(name){

window.location.href=name+".html";

}

//rating section

const ratings=document.querySelectorAll(".rating");

ratings.forEach(r=>{

let value=r.dataset.rating;

r.innerHTML="⭐".repeat(Math.floor(value));

});

