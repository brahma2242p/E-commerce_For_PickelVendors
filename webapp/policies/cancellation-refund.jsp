<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cancellation & Refund Policy - KNR Foods</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/styles.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/policy-styles.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>
        <nav class="navbar" id="navbar">
            <div class="nav-container">
                <div class="nav-logo">
                    <img src="${pageContext.request.contextPath}/images/knr_logo.jpg" alt="KNR Foods Logo" class="nav-logo-img">

                    <h2><a href="${pageContext.request.contextPath}/index.html" style="color:white; text-decoration:none;">KNR Foods</a></h2>
                </div>
                <ul class="nav-menu">
                    <li><a href="/index.html" class="nav-link">Home</a></li>
                    <li><a href="/catalog.jsp" class="nav-link">Catalog</a></li>
                    <li><a href="/index.html#testimonials" class="nav-link">Testimonials</a></li>
                    <li><a href="/suggest.html" class="nav-link">Suggest</a></li>
                    <li><a href="/index.html#about" class="nav-link">About</a></li>
                    <li><a href="/index.html#contact" class="nav-link">Contact</a></li>
                </ul>
                <div class="nav-icons">
                    <div class="profile-icon" id="profileIcon">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="cart-icon" id="cartIcon">
                        <i class="fas fa-shopping-cart"></i>
                        <span class="cart-badge" id="cartBadge">₹0</span>
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


    <main class="policy-container">
        <h1>Cancellation & Refund Policy</h1>
        <p><strong>Effective Date:</strong> February 10, 2025</p>
        <p>We understand that sometimes plans change. This policy outlines our process for cancellations, returns, and refunds to ensure a fair and smooth experience for all customers.</p>

        <h2>1. Order Cancellations</h2>
        <ul>
            <li>You may cancel your order within 4 hours of placing it.</li>
            <li>To request cancellation, please email us at 📧 brahmareddypalem5757@gmail.com</li>
            <li><strong>Note:</strong> If the order has already been processed or shipped, we won’t be able to cancel it.</li>
        </ul>

        <h2>2. Refunds</h2>
        <p>We offer refunds in the following cases:</p>
        <ul>
            <li>You received a defective or incorrect item.</li>
            <li>You notify us within 7 days of receiving your order.</li>
            <li>After verification, a full refund or replacement will be processed.</li>
            <li>Refunds will be issued to the original payment method within 7 business days.</li>
        </ul>

        <h2>3. Returns</h2>
        <p>To be eligible for a return:</p>
        <ul>
            <li>The item must be unopened, unused, and in its original packaging.</li>
            <li>Return shipping costs are the responsibility of the customer unless the item is defective or incorrect.</li>
            <li>Returns must be initiated within 24 hours of delivery.</li>
        </ul>

        <h2>4. How to Initiate a Return or Refund</h2>
        <p>To request a return or refund:</p>
        <ul>
            <li>Email us at brahmareddypalem5757@gmail.com</li>
            <li>Include your Order Number and a description of the issue.</li>
            <li>We’ll respond with return instructions or process a refund/replacement as applicable.</li>
            <li>If a replacement is requested, it must be raised within 24 hours of delivery.</li>
            <li>The replacement item will be shipped within 5–7 business days.</li>
        </ul>
        
        <h2>5. No Cash on Delivery (COD)</h2>
        <p>Please note: Cash on Delivery (COD) is not available for any orders.</p>
    </main>

    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>KNR Foods</h3>
                    <p>Preserving traditions, one pickle at a time.</p>
                    <div class="social-links">
                        <a href="#"><i class="fab fa-facebook"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-whatsapp"></i></a>
                    </div>
                </div>
                <div class="footer-section">
                    <h4>Quick Links</h4>
                    <ul class="nav-menu">
                        <li><a href="${pageContext.request.contextPath}/index.html" class="nav-link">Home</a></li>
                        <li><a href="${pageContext.request.contextPath}/catalog.html" class="nav-link">Catalog</a></li>
                        <li><a href="${pageContext.request.contextPath}/index.html#testimonials" class="nav-link">Testimonials</a></li>
                        <li><a href="${pageContext.request.contextPath}/suggest.html" class="nav-link">Suggest</a></li>
                        <li><a href="${pageContext.request.contextPath}/index.html#about" class="nav-link">About</a></li>
                        <li><a href="${pageContext.request.contextPath}/index.html#contact" class="nav-link">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Categories</h4>
                    <ul>
                        <li><a href="#">Vegetarian Pickles</a></li>
                        <li><a href="#">Non-Veg Pickles</a></li>
                        <li><a href="#">Seasonal Specials</a></li>
                        <li><a href="#">Gift Hampers</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Customer Care</h4>
                    <ul>
                        <li><a href="${pageContext.request.contextPath}/policies/shipping-policy.jsp">Shipping Policy</a></li>
                        <li><a href="${pageContext.request.contextPath}/policies/cancellation-refund.jsp">Cancellation & Refund</a></li>
                        <li><a href="${pageContext.request.contextPath}/policies/privacy-policy.jsp">Privacy Policy</a></li>
                        <li><a href="${pageContext.request.contextPath}/policies/terms-conditions.jsp">Terms & Conditions</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 Spice Heritage. All rights reserved.<br> Developed and Maintained by Brahma Reddy Palam</p>
            </div>
        </div>
    </footer>




<script src="${pageContext.request.contextPath}/JavaScript/script.js"></script>
</body>
</html>
