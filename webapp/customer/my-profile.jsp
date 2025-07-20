<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.spiceheritage.model.User, com.spiceheritage.model.Address, java.util.List" %>
<%
    User user = (User) request.getAttribute("user");
    List<Address> addresses = (List<Address>) request.getAttribute("addresses");
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Profile - KNR Foods</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/styles.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/my-profile-styles.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>
    <!-- CORRECTED: Added the full navigation bar for a consistent user experience -->
    <nav class="navbar" id="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <h2><a href="${pageContext.request.contextPath}/index.html" style="color:white; text-decoration:none;">KNR Foods</a></h2>
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
                    <a href="/spiceheritage/customer/my-profile" class="dropdown-item">
                        <i class="fas fa-user"></i>
                        <span>My Profile</span>
                    </a>
                    <a href="/spiceheritage/customer/my-orders" class="dropdown-item">
                        <i class="fas fa-box"></i>
                        <span>My Orders</span>
                    </a>
                    <div class="dropdown-item logout-btn">
                        <i class="fas fa-sign-out-alt"></i>
                        <span>Logout</span>
                    </div>
                </div>
            </div>
            <div class="navButton" id="navButton">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>

    <main class="profile-container">
        <h1>My Profile</h1>
        <div class="profile-grid">
            <div class="profile-card">
                <h3>Account Details</h3>
                <div class="detail-group"><label>Full Name</label><p><%= user.getFullName() %></p></div>
                <div class="detail-group"><label>Email Address</label><p><%= user.getEmail() %></p></div>
                <div class="detail-group"><label>Mobile Number</label><p><%= user.getMobileNumber() %></p></div>
                <a href="${pageContext.request.contextPath}/customer/edit-profile.jsp" class="btn-edit-details">Edit Details</a>
                

            </div>
            <div class="profile-card">
                <h3>Saved Addresses</h3>
                <% if (addresses != null) { for (Address address : addresses) { %>
                    <div class="address-card">
                        <p>
                            <strong><%= address.getFullName() %></strong><br>
                            <%= address.getAddressLine1() %><br>
                            <% if (address.getAddressLine2() != null && !address.getAddressLine2().isEmpty()) { %>
                                <%= address.getAddressLine2() %><br>
                            <% } %>
                            <%= address.getCity() %>, <%= address.getState() %> - <%= address.getPincode() %><br>
                            Phone: <%= address.getMobileNumber() %>
                        </p>
                        <div class="address-actions">
                            <a href="${pageContext.request.contextPath}/customer/edit-address.jsp?id=<%= address.getAddressId() %>" class="btn-link">Edit</a>
                            <a href="${pageContext.request.contextPath}/address-manager?action=delete&id=<%= address.getAddressId() %>" class="btn-link btn-delete" onclick="return confirm('Are you sure you want to delete this address?');">Delete</a>
                        </div>
                    </div>
                <% }} %>
                <% if (addresses == null || addresses.size() < 3) { %>
                    <a href="${pageContext.request.contextPath}/customer/add-address.jsp" class="btn-add-new-address"><i class="fas fa-plus"></i> Add New Address</a>
                <% } %>
            </div>
        </div>
    </main>

    <!-- CORRECTED: Added the script tag to make the navbar interactive -->
    <script src="${pageContext.request.contextPath}/JavaScript/script.js"></script>
</body>
</html>
