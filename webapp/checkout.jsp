<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="com.spiceheritage.model.Address" %>
<%@ page import="com.spiceheritage.model.User" %>

<%
    List<Address> addresses = (List<Address>) request.getAttribute("addresses");
    User user = (User) session.getAttribute("user");
    String email = (user != null) ? user.getEmail() : "";
%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checkout - KNR Foods</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/styles.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/checkout-styles.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>

<nav class="navbar" id="navbar">
    <div class="nav-container">
        <div class="nav-logo">
            <h2>KNR Foods</h2>
        </div>
        <ul class="nav-menu">
                <li><a href="${pageContext.request.contextPath}/index.html" class="nav-link">Home</a></li>
                <li><a href="${pageContext.request.contextPath}/catalog.html" class="nav-link">Catalog</a></li>
                <li><a href="${pageContext.request.contextPath}/index.html#testimonials" class="nav-link">Testimonials</a></li>
                <li><a href="${pageContext.request.contextPath}/suggest.html" class="nav-link">Suggest</a></li>
                <li><a href="${pageContext.request.contextPath}/index.html#about" class="nav-link">About</a></li>
                <li><a href="${pageContext.request.contextPath}/index.html#contact" class="nav-link">Contact</a></li>
        </ul>
        <div class="nav-icons">
            <div class="profile-icon" id="profileIcon">
                <i class="fas fa-user"></i>
            </div>
            <div class="cart-icon" id="cartIcon">
                <i class="fas fa-shopping-cart"></i>
                <span class="cart-badge" id="cartBadge">₹0</span>
            </div>
            <div class="cart-panel" id="cartPanel">
                <div class="cart-header">
                    <h3>🛒 My Cart (<span id="cartItemCount">0</span> Items)</h3>
                    <span class="cart-total" id="cartTotal">₹0.00</span>
                    <button class="close-cart" id="closeCart">&times;</button>
                </div>
                <div class="cart-items" id="cartItems">
                    <div class="empty-cart">
                        <p>Your cart is empty!</p>
                    </div>
                </div>
                <div class="cart-footer">
                    <div class="cart-subtotal">
                        <strong>Subtotal: <span id="cartSubtotal">₹0.00</span></strong>
                    </div>
                    <div class="cart-buttons">
                        <button class="checkout-btn" id="checkoutBtn">Checkout</button>
                        <button class="keep-shopping-btn" id="keepShoppingBtn">Keep Shopping</button>
                    </div>
                </div>
            </div>
            <div class="profile-dropdown" id="profileDropdown">
                <a href="${pageContext.request.contextPath}/customer/my-profile" class="dropdown-item">
                    <i class="fas fa-user"></i><span>My Profile</span>
                </a>
                <a href="${pageContext.request.contextPath}/customer/my-orders" class="dropdown-item">
                    <i class="fas fa-box"></i><span>My Orders</span>
                </a>
                <div class="dropdown-item logout-btn">
                    <i class="fas fa-sign-out-alt"></i><span>Logout</span>
                </div>
            </div>
        </div>
    </div>
</nav>

<div class="checkout-container">
    <div class="checkout-main">
        <header class="main-header">
            <h2>KNR Foods</h2>
        </header>
        <main class="main-content">
            <%
                if (addresses != null && !addresses.isEmpty()) {
            %>
            <div class="step">
                <h3>Select a Saved Address</h3>
                <div class="address-selector">
                    <%
                        for (int i = 0; i < addresses.size(); i++) {
                            Address addr = addresses.get(i);
                    %>
                    <div class="saved-address-option">
                        <input type="radio" name="selectedAddress" id="addr<%= addr.getAddressId() %>" value="<%= addr.getAddressId() %>"
                               data-full-name="<%= addr.getFullName() %>"
                               data-address1="<%= addr.getAddressLine1() %>"
                               data-address2="<%= addr.getAddressLine2() == null ? "" : addr.getAddressLine2() %>"
                               data-city="<%= addr.getCity() %>"
                               data-state="<%= addr.getState() %>"
                               data-pincode="<%= addr.getPincode() %>"
                               data-mobile="<%= addr.getMobileNumber() %>"
                               <%= (i == 0 ? "checked" : "") %> >
                        <label for="addr<%= addr.getAddressId() %>">
                            <strong><%= addr.getFullName() %></strong><br>
                            <%= addr.getAddressLine1() %>
                            <% if (addr.getAddressLine2() != null && !addr.getAddressLine2().isEmpty()) { %>, <%= addr.getAddressLine2() %><% } %>
                            , <%= addr.getCity() %>, <%= addr.getState() %> - <%= addr.getPincode() %><br>
                            Phone: <%= addr.getMobileNumber() %>
                        </label>
                    </div>
                    <% } %>

                    <div class="saved-address-option">
                        <input type="radio" name="selectedAddress" id="newAddress" value="new">
                        <label for="newAddress">
                            <strong>Use a new address</strong>
                        </label>
                    </div>
                </div>
            </div>
            <% } %>

            <div class="step" id="new-address-form-container">
                <h3>
                    <%
                        if (addresses != null && !addresses.isEmpty()) {
                    %>
                            Or Enter a New Delivery Address
                    <%
                        } else {
                    %>
                            Delivery Address
                    <%
                        }
                    %>
                </h3>
                <form id="shipping-form">
                    <div class="form-group">
                        <input type="text" id="email" placeholder="Email (for order updates)" value="<%= email %>" required>
                    </div>
                    <div class="form-row" style="grid-template-columns: 1fr 1fr; margin-bottom: 1rem;">
                        <div class="form-group">
                            <input type="text" id="firstName" placeholder="First name">
                        </div>
                        <div class="form-group">
                            <input type="text" id="lastName" placeholder="Last name" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <input type="text" id="address" placeholder="Address" required>
                    </div>
                    <div class="form-group">
                        <input type="text" id="apartment" placeholder="Apartment, suite, etc. (optional)">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <input type="text" id="city" placeholder="City" required>
                        </div>
                        <div class="form-group">
                            <select id="state" required>
                                <option value="Telangana">Telangana</option>
                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <input type="text" id="pincode" placeholder="PIN code" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <input type="tel" id="mobile" placeholder="Phone" required>
                    </div>
                </form>
            </div>
        </main>
    </div>

    <aside class="checkout-sidebar">
        <div class="order-summary">
            <div class="summary-items" id="summary-items">
                </div>
            <div class="summary-calculation">
                <div class="calc-row">
                    <span>Subtotal</span>
                    <span id="summary-subtotal">₹0.00</span>
                </div>
                <div class="calc-row">
                    <span>Shipping</span>
                    <span id="summary-shipping">₹50.00</span>
                </div>
                <div class="calc-row">
                    <span>Taxes (5%)</span>
                    <span id="summary-taxes">₹0.00</span>
                </div>
            </div>
            <div class="summary-total">
                <div class="calc-row total-row grand-total">
                    <span>Total</span>
                    <strong id="summary-grandtotal">₹0.00</strong>
                </div>
            </div>
            <button class="place-order-btn" id="place-order-btn">Place Order</button>
        </div>
    </aside>
</div>

<script src="${pageContext.request.contextPath}/JavaScript/script.js"></script>
<script src="${pageContext.request.contextPath}/JavaScript/checkout.js"></script>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const addressRadios = document.querySelectorAll('input[name="selectedAddress"]');
        const formContainer = document.getElementById('new-address-form-container');
        const newAddressForm = document.getElementById('shipping-form');

        function populateForm(selectedRadio) {
            if (!selectedRadio || selectedRadio.value === 'new') {
                formContainer.style.display = 'block';
                newAddressForm.reset();
                document.getElementById('email').value = "<%= email %>";
            } else {
                formContainer.style.display = 'none'; // Hide the form by default
                const fullName = selectedRadio.dataset.fullName || '';
                const nameParts = fullName.split(' ');
                const firstName = nameParts.shift();
                const lastName = nameParts.join(' ');

                document.getElementById('firstName').value = firstName || '';
                document.getElementById('lastName').value = lastName || '';
                document.getElementById('address').value = selectedRadio.dataset.address1 || '';
                document.getElementById('apartment').value = selectedRadio.dataset.address2 || '';
                document.getElementById('city').value = selectedRadio.dataset.city || '';
                document.getElementById('state').value = selectedRadio.dataset.state || '';
                document.getElementById('pincode').value = selectedRadio.dataset.pincode || '';
                document.getElementById('mobile').value = selectedRadio.dataset.mobile || '';
            }
        }
        
        addressRadios.forEach(radio => {
            radio.addEventListener('change', (event) => {
                if (event.target.value === 'new') {
                    formContainer.style.display = 'block';
                } else {
                    formContainer.style.display = 'none';
                }
            });
        });

        // Initial setup on page load
        const initiallyChecked = document.querySelector('input[name="selectedAddress"]:checked');
        if (initiallyChecked && initiallyChecked.value !== 'new') {
            formContainer.style.display = 'none';
        } else {
            formContainer.style.display = 'block';
        }
    });
</script>

</body>
</html>