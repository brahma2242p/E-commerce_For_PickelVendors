<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shipping Policy - KNR Foods</title>
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
        <h1>Shipping Policy</h1>
        <p><strong>Effective Date:</strong> February 10, 2025</p>
        <p>At Spice Heritage, we aim to deliver your favorite pickles as quickly and efficiently as possible. Please read our shipping policy carefully to understand how we process, ship, and handle deliveries.</p>

        <h2>1. Order Processing Time</h2>
        <ul>
            <li>Orders are processed within 1–2 business days (excluding weekends and public holidays).</li>
            <li>Orders placed on weekends or holidays will be processed on the next working day.</li>
        </ul>

        <h2>2. Shipping Methods & Delivery Times</h2>
        <p>We currently offer the following shipping options:</p>
        <ul>
            <li><strong>Standard Shipping:</strong> Estimated delivery in 5–7 business days</li>
            <li><strong>Expedited Shipping:</strong> Estimated delivery in 2–3 business days</li>
        </ul>
        <p><em>(Additional shipping methods may be introduced based on availability)</em></p>
        <p><strong>Note:</strong> Delivery timelines are approximate and may vary due to weather conditions, public holidays, courier delays, or other unforeseen circumstances.</p>

        <h2>3. Shipping Charges</h2>
        <ul>
            <li>Shipping charges are calculated during checkout based on your delivery address and selected shipping method.</li>
            <li>Free Shipping is available on orders above ₹1999/- (within India only).</li>
        </ul>

        <h2>4. International Shipping</h2>
        <ul>
            <li>We currently offer international shipping to select countries.</li>
            <li>Shipping rates and delivery timelines for international orders vary depending on the destination.</li>
            <li>Customs duties, import taxes, and any other applicable charges are the responsibility of the customer.</li>
        </ul>

        <h2>5. Order Tracking</h2>
        <ul>
            <li>Once your order is shipped, a tracking number will be sent to your registered email.</li>
            <li>Please allow up to 24 hours for tracking details to become active.</li>
        </ul>

        <h2>6. Shipping Restrictions</h2>
        <ul>
            <li>We do not ship to P.O. Boxes, APO/FPO addresses, or other non-standard delivery addresses.</li>
            <li>Additional shipping restrictions may apply based on the destination or product type.</li>
        </ul>

        <h2>7. Shipping Issues</h2>
        <p>If your order is delayed, damaged, or lost, please contact us immediately:<br>
        📧 Email: brahmareddypalem5757@gmail.com</p>
        <p>We will coordinate with the carrier to resolve the issue as soon as possible.</p>

        <h2>8. Incorrect Shipping Information</h2>
        <ul>
            <li>Customers are responsible for providing accurate and complete shipping details.</li>
            <li>If an order is returned due to an incorrect address, additional shipping charges will apply for reshipment.</li>
        </ul>
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
                    <ul>
                        <li><a href="/index.html">Home</a></li>
                        <li><a href="/catalog.html">Catalog</a></li>
                        <li><a href="/index.html#about">About</a></li>
                        <li><a href="/index.html#contact">Contact</a></li>
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
