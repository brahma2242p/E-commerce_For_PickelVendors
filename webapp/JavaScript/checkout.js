document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    const summaryItemsContainer = document.getElementById("summary-items");
    const summarySubtotalElem = document.getElementById("summary-subtotal");
    const summaryShippingElem = document.getElementById("summary-shipping");
    const summaryTaxesElem = document.getElementById("summary-taxes");
    const summaryGrandTotalElem = document.getElementById("summary-grandtotal");
    const placeOrderBtn = document.getElementById("place-order-btn");

    const SHIPPING_COST = 50.00;
    const TAX_RATE = 0.05; // 5% tax rate

    function renderOrderSummary() {
        if (cart.length === 0) {
            summaryItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
            if(placeOrderBtn) placeOrderBtn.disabled = true;
            return;
        }

        summaryItemsContainer.innerHTML = "";
        let subtotal = 0;

        cart.forEach(item => {
            const itemTotalPrice = item.totalPrice * item.quantity;
            subtotal += itemTotalPrice;

            const itemElement = document.createElement("div");
            itemElement.className = "summary-item";
            itemElement.innerHTML = `
                <div class="summary-item-image">
                    <img src="${item.image}" alt="${item.name}">
                    <span class="item-quantity-badge">${item.quantity}</span>
                </div>
                <div class="summary-item-info">
                    <strong>${item.name}</strong>
                    <p>${item.weight}g</p>
                </div>
                <div class="summary-item-price">
                    <strong>₹${itemTotalPrice.toFixed(2)}</strong>
                </div>
            `;
            summaryItemsContainer.appendChild(itemElement);
        });

        const taxes = subtotal * TAX_RATE;
        const grandTotal = subtotal + SHIPPING_COST + taxes;
        
        if (summarySubtotalElem) summarySubtotalElem.textContent = `₹${subtotal.toFixed(2)}`;
        if (summaryShippingElem) summaryShippingElem.textContent = `₹${SHIPPING_COST.toFixed(2)}`;
        if (summaryTaxesElem) summaryTaxesElem.textContent = `₹${taxes.toFixed(2)}`;
        if (summaryGrandTotalElem) summaryGrandTotalElem.textContent = `₹${grandTotal.toFixed(2)}`;
    }

    async function placeOrder() {
        const selectedAddressRadio = document.querySelector('input[name="selectedAddress"]:checked');
        const params = new URLSearchParams();

        if (selectedAddressRadio && selectedAddressRadio.value !== 'new') {
            params.append('addressId', selectedAddressRadio.value);
        } else {
            const email = document.getElementById("email").value.trim();
            const firstName = document.getElementById("firstName").value.trim();
            const lastName = document.getElementById("lastName").value.trim();
            const address = document.getElementById("address").value.trim();
            const apartment = document.getElementById("apartment").value.trim();
            const city = document.getElementById("city").value.trim();
            const state = document.getElementById("state").value.trim();
            const pincode = document.getElementById("pincode").value.trim();
            const mobile = document.getElementById("mobile").value.trim();

            if (!email || !lastName || !address || !city || !state || !pincode || !mobile) {
                alert("Please fill out all required address and contact fields.");
                return;
            }
            params.append('firstName', firstName);
            params.append('lastName', lastName);
            params.append('address', address);
            params.append('apartment', apartment);
            params.append('city', city);
            params.append('state', state);
            params.append('pincode', pincode);
            params.append('mobile', mobile);
        }
        
        const subtotal = cart.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0);
        const taxes = subtotal * TAX_RATE;
        const totalAmount = subtotal + SHIPPING_COST + taxes;
        
        const cartItemsForBackend = cart.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            pricePerGram: item.pricePerGram,
            weightGrams: item.weight
        }));

        params.append('totalAmount', totalAmount);
        params.append('cartItems', JSON.stringify(cartItemsForBackend));
        
        try {
            const response = await fetch('/spiceheritage/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: params
            });

            if (response.status === 401) {
                 alert("Your session has expired. Please log in again to place your order.");
                 return;
            }

            const result = await response.json();

            if (result.success) {
                alert("Order placed successfully! Thank you for shopping with us.");
                localStorage.removeItem("cart");
                window.location.href = "/spiceheritage/index.html"; // Redirect to home page
            } else {
                // Display the specific error message from the backend
                alert(result.message || "There was an issue placing your order. Please try again.");
            }
        } catch (error) {
            console.error("Failed to place order:", error);
            alert("A network error occurred. Please check your connection and try again.");
        }
    }

    if (placeOrderBtn) {
        placeOrderBtn.addEventListener("click", placeOrder);
    }

    renderOrderSummary();
});