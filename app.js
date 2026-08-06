// ---------- LOAD ORDER SUMMARY ----------

const orderItems = document.getElementById("orderItems");
const grandTotal = document.getElementById("grandTotal");

if (orderItems && grandTotal) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    orderItems.innerHTML = "";

    if (cart.length === 0) {

        orderItems.innerHTML = "<p>Your Cart is Empty</p>";

        grandTotal.innerHTML = "Total : ₹0";

    } else {

        cart.forEach(item => {

            const itemTotal = item.price * item.quantity;

            total += itemTotal;

            orderItems.innerHTML += `
                <p>
                    ${item.name} × ${item.quantity}
                    <span>₹${itemTotal}</span>
                </p>
            `;

        });

        total += 40;

        grandTotal.innerHTML = "Total : ₹" + total;

    }

}
// checkout form section

const checkoutForm = document.getElementById("checkoutForm");

if (checkoutForm) {

    checkoutForm.addEventListener("submit", function (e) {

        e.preventDefault();

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const email = document.getElementById("email").value;
        const address = document.getElementById("address").value;
        const city = document.getElementById("city").value;
        const pincode = document.getElementById("pincode").value;

        const payment = document.querySelector('input[name="payment"]:checked').value;

        let total = 0;

        let message = "🍔 FOODHUB ORDER\n\n";

        message += "Name : " + name + "\n";
        message += "Phone : " + phone + "\n";
        message += "Email : " + email + "\n";
        message += "Address : " + address + "\n";
        message += "City : " + city + "\n";
        message += "Pincode : " + pincode + "\n";
        message += "Payment : " + payment + "\n\n";

        message += "Order Details\n";

        cart.forEach(item => {

            let itemTotal = item.price * item.quantity;

            total += itemTotal;

            message += `${item.name} x ${item.quantity} = ₹${itemTotal}\n`;

        });

        total += 40;

        message += "\nDelivery : ₹40";
        message += "\nTotal : ₹" + total;

        const whatsappNumber = "919065521532"; // Apna WhatsApp Number

        const url =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(message);

        localStorage.removeItem("cart");

        window.location.href = url;

    });

}