<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Privacy Policy - KNR Foods</title>
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
        <h1>Privacy Policy</h1>
        <p><strong>Effective Date:</strong> February 10, 2025</p>
        <p>At Spice Heritage Private Limited, your privacy is our priority. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website or purchase products from our online store.</p>

        <h2>1. Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul>
            <li><strong>Personal Information:</strong> Name, email address, phone number, shipping/billing address.</li>
            <li><strong>Usage Data:</strong> IP address, browser type/version, device information, pages visited, and other analytics.</li>
            <li><strong>Payment Information:</strong> Payment details are collected only to complete transactions. All payments are securely processed via trusted third-party payment gateways — we do not store your payment information.</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>Your information may be used to:</p>
        <ul>
            <li>Process, verify, and fulfill orders.</li>
            <li>Improve our website’s performance, functionality, and content.</li>
            <li>Respond to inquiries and provide customer support.</li>
            <li>Send updates, promotions, and newsletters (only with your explicit consent).</li>
        </ul>

        <h2>3. Data Security</h2>
        <p>We implement industry-standard security practices to protect your data. However, please note:</p>
        <ul>
            <li>No method of online transmission or electronic storage is 100% secure.</li>
            <li>While we strive to safeguard your information, we cannot guarantee absolute security.</li>
        </ul>

        <h2>4. Sharing Your Information</h2>
        <p>We do not sell or rent your personal information. We may share your data with trusted third-party partners, such as:</p>
        <ul>
            <li>Payment Processors</li>
            <li>Shipping and Delivery Services</li>
            <li>Email Communication Tools</li>
        </ul>
        <p>These parties are obligated to protect your data and use it only for service-related functions.</p>

        <h2>5. Cookies</h2>
        <p>Our website uses cookies to:</p>
        <ul>
            <li>Recognize your browser/device.</li>
            <li>Personalize your experience.</li>
            <li>Analyze site traffic and performance.</li>
        </ul>
        <p>You can manage cookie preferences through your browser settings.</p>

        <h2>6. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
            <li>Request access to the personal data we hold about you.</li>
            <li>Update or correct your personal information.</li>
            <li>Request deletion of your data (subject to legal obligations).</li>
            <li>Withdraw consent from promotional communications at any time.</li>
        </ul>

        <h2>7. Contact Us</h2>
        <p>For questions, concerns, or requests related to your personal data, please reach out to:</p>
        <p>
            P. Brahma Reddy<br>
            Andhra Pradesh, India – 523264<br>
            📧 Email: brahmareddypalem5757@gmail.com<br>
            🌐 Website: www.spiceheritage.com<br>
            📱 WhatsApp Only: +91 93924 55293
        </p>
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
