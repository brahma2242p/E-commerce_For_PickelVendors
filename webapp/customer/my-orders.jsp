<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.spiceheritage.model.Order, com.spiceheritage.model.OrderItem, java.util.List, java.text.SimpleDateFormat" %>
<%
    List<Order> orders = (List<Order>) request.getAttribute("orders");
    SimpleDateFormat dateFormat = new SimpleDateFormat("dd MMM yyyy");
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Orders - KNR Foods</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/styles.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/my-orders-styles.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>
    <!-- CORRECTED: Added the full, interactive navigation bar -->
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

    <main class="orders-container">
        <h1>My Orders</h1>
        
        <% if (orders == null || orders.isEmpty()) { %>
            <div class="no-orders">
                <p>You haven't placed any orders yet.</p>
                <a href="${pageContext.request.contextPath}/catalog.html" class="cta-button">Start Shopping</a>
            </div>
        <% } else { %>
            <div class="orders-list">
                <% for (Order order : orders) { %>
                    <div class="order-card">
                        <div class="order-card-header">
                            <div>
                                <h4>Order #<%= order.getOrderId() %></h4>
                                <p>Placed on <%= dateFormat.format(order.getOrderDate()) %></p>
                            </div>
                            <div class="order-total">
                                <span>TOTAL</span>
                                <strong>₹<%= String.format("%.2f", order.getTotalAmount()) %></strong>
                            </div>
                        </div>
                        <div class="order-card-body">
                            <% for (OrderItem item : order.getItems()) { %>
                                <div class="order-item">
                                    <div class="order-item-details">
                                        <strong><%= item.getProductName() %></strong>
                                        <span><%= item.getWeightGrams() %>g x <%= item.getQuantity() %></span>
                                    </div>
                                    <div class="order-item-price">
                                        <strong>₹<%= String.format("%.2f", item.getPricePerGram() * item.getWeightGrams() * item.getQuantity()) %></strong>
                                    </div>
                                </div>
                            <% } %>
                        </div>
                        <div class="order-card-footer">
                            <p><strong>Status:</strong> <span class="status-<%= order.getOrderStatus().toLowerCase() %>"><%= order.getOrderStatus() %></span></p>
                            <p><strong>Shipping to:</strong> <%= order.getShippingAddress() %></p>
                        </div>
                    </div>
                <% } %>
            </div>
        <% } %>
    </main>

    <!-- CORRECTED: Added the script tag to make the navbar interactive -->
    <script src="${pageContext.request.contextPath}/JavaScript/script.js"></script>
</body>
</html>
