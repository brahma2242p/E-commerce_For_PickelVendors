// Global Variables
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let isLoggedIn = false; // Will be verified by the server on page load
let currentUser = null;
let products = [];

document.addEventListener("DOMContentLoaded", async () => {
    // First, verify the login status with the server
    await checkLoginStatus();

    // Then, proceed with loading the rest of the page content
    products = await fetchProducts();
    initializeApp();
    setupEventListeners();
    updateCartUI();

    if (document.getElementById("featuredProducts")) {
        loadFeaturedProducts();
    }
    if (document.getElementById("catalogProducts")) {
        loadCatalogProducts();
        applyFilterFromURL();
    }
    setupScrollAnimations();
});

/**
 * Checks the user's login status by querying the server's session.
 * This is the single source of truth for whether a user is logged in.
 */
async function checkLoginStatus() {
    try {
        const response = await fetch('/spiceheritage/api/check-session', {
            credentials: 'include'
        });

        if (response.ok) {
            const user = await response.json();
            isLoggedIn = true;
            currentUser = { name: user.fullName, email: user.email };
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
        } else {
            isLoggedIn = false;
            currentUser = null;
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("currentUser");

            // 🔒 Only redirect if on a protected page
            const protectedPages = ["/profile.html", "/checkout.html", "/myorders.html"];
            const path = window.location.pathname;
            const isProtected = protectedPages.some(page => path.endsWith(page));
            if (isProtected) handleSessionExpired(); // Redirect only on secure pages
        }
    } catch (error) {
        console.error("Could not check session status:", error);
        isLoggedIn = false;
        currentUser = null;
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("currentUser");
    }
    updateAuthUI();
}


/**
 * Handles the complete logout process when a user's session expires on protected pages.
 */
function handleSessionExpired() {
    isLoggedIn = false;
    currentUser = null;
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    updateAuthUI();
    alert("Your session has expired. Please log in again.");
    window.location.href = "/spiceheritage/index.html";
}

/**
 * Updates the navigation bar's profile icon based on the login state.
 */
function updateAuthUI() {
    const profileIcon = document.getElementById("profileIcon");
    if (!profileIcon) return;

    if (isLoggedIn && currentUser) {
        // If logged in, show the user's initial in a styled circle
        profileIcon.innerHTML = `<span class="profile-initial">${currentUser.name.charAt(0).toUpperCase()}</span>`;
        profileIcon.title = `Logged in as ${currentUser.name}`;
    } else {
        // If logged out, show the default user icon
        profileIcon.innerHTML = '<i class="fas fa-user"></i>';
        profileIcon.title = "Login / Register";
    }
}

// ... (The rest of your script.js functions remain the same)

async function fetchProducts() {
    try {
        const response = await fetch('/spiceheritage/api/products');
        if (!response.ok) {
            throw new Error(`Network response was not ok. Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return [];
    }
}

function initializeApp() {
    window.addEventListener("scroll", () => {
        const navbar = document.getElementById("navbar");
        if (navbar && window.scrollY > 50) {
            navbar.style.background = "rgba(139, 0, 0, 0.95)";
            navbar.style.backdropFilter = "blur(10px)";
        } else if (navbar) {
            navbar.style.background = "#8B0000";
            navbar.style.backdropFilter = "none";
        }
    });
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });
}

function setupEventListeners() {
    const navButton = document.getElementById("navButton");
    const navMenu = document.querySelector(".nav-menu");
    if (navButton) {
        navButton.addEventListener("click", () => {
            if (navMenu) navMenu.classList.toggle("active");
            navButton.classList.toggle("active");
        });
    }

    const profileIcon = document.getElementById("profileIcon");
    const profileDropdown = document.getElementById("profileDropdown");
    const authModal = document.getElementById("authModal");
    if (profileIcon) {
        profileIcon.addEventListener("click", (e) => {
            e.stopPropagation();
            if (isLoggedIn) {
                if (profileDropdown) profileDropdown.classList.toggle("active");
            } else {
                if (authModal) authModal.classList.add("active");
            }
        });
    }

    const cartIcon = document.getElementById("cartIcon");
    const cartPanel = document.getElementById("cartPanel");
    if (cartIcon && cartPanel) {
        cartIcon.addEventListener("click", () => {
            cartPanel.classList.add("active");
            updateCartItems();
        });
    }

    const closeCart = document.getElementById("closeCart");
    if (closeCart && cartPanel) {
        closeCart.addEventListener("click", () => cartPanel.classList.remove("active"));
    }

    const keepShoppingBtn = document.getElementById("keepShoppingBtn");
    if (keepShoppingBtn) {
        keepShoppingBtn.addEventListener("click", () => {
            window.location.href = '/spiceheritage/catalog.html';
        });
    }

    const checkoutBtn = document.getElementById("checkoutBtn");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            if (!isLoggedIn) {
                if (cartPanel) cartPanel.classList.remove("active");
                if (authModal) authModal.classList.add("active");
                showToast("Please login to proceed with checkout", "warning");
            } else {
                window.location.href = "/spiceheritage/checkout.html";
            }
        });
    }

    setupAuthModalListeners();
    setupFormSubmissions();
    setupCatalogListeners();
    document.addEventListener("click", () => {
        if (profileDropdown) profileDropdown.classList.remove("active");
    });
}

function setupAuthModalListeners() {
    const authModal = document.getElementById("authModal");
    if (!authModal) return;

    const closeAuthModal = document.getElementById("closeAuthModal");
    const tabBtns = document.querySelectorAll(".tab-btn");
    const authForms = document.querySelectorAll(".auth-form");
    const forgotPasswordLink = document.querySelector(".forgot-password");
    const backToLoginBtns = document.querySelectorAll(".back-to-login");
    const togglePasswordBtns = document.querySelectorAll(".toggle-password");

    if (closeAuthModal) {
        closeAuthModal.addEventListener("click", () => authModal.classList.remove("active"));
    }

    tabBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            tabBtns.forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            authForms.forEach(form => form.classList.remove("active"));
            document.getElementById(`${this.dataset.tab}Form`).classList.add("active");
        });
    });

    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener("click", (e) => {
            e.preventDefault();
            authForms.forEach(form => form.classList.remove("active"));
            document.getElementById("forgotPasswordForm").classList.add("active");
        });
    }

    backToLoginBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            authForms.forEach(form => form.classList.remove("active"));
            document.getElementById("loginForm").classList.add("active");
            tabBtns.forEach(b => b.classList.remove("active"));
            document.querySelector('[data-tab="login"]').classList.add("active");
        });
    });

    togglePasswordBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            const input = this.parentElement.querySelector("input");
            input.type = input.type === "password" ? "text" : "password";
            this.querySelector("i").classList.toggle("fa-eye");
            this.querySelector("i").classList.toggle("fa-eye-slash");
        });
    });

    const logoutBtn = document.querySelector(".logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", logout);
    }
}

function setupFormSubmissions() {
    const loginForm = document.getElementById("loginFormSubmit");
    if (loginForm) loginForm.addEventListener("submit", (e) => { e.preventDefault(); handleLogin(loginForm); });

    const registerForm = document.getElementById("registerFormSubmit");
    if (registerForm) registerForm.addEventListener("submit", (e) => { e.preventDefault(); handleRegister(registerForm); });

    const forgotPasswordForm = document.getElementById("forgotPasswordSubmit");
    if (forgotPasswordForm) forgotPasswordForm.addEventListener("submit", (e) => { e.preventDefault(); handleForgotPassword(forgotPasswordForm); });

    const resetPasswordForm = document.getElementById("resetPasswordSubmit");
    if (resetPasswordForm) resetPasswordForm.addEventListener("submit", (e) => { e.preventDefault(); handleResetPassword(resetPasswordForm); });

    const contactForm = document.getElementById("contactForm");
    if (contactForm) contactForm.addEventListener("submit", (e) => { e.preventDefault(); handleContactForm(contactForm); });

    const suggestForm = document.getElementById("suggestForm");
    if (suggestForm) suggestForm.addEventListener("submit", (e) => { e.preventDefault(); handleSuggestForm(suggestForm); });
}

async function handleLogin(form) {
    const emailOrMobile = form.querySelector('input[name="emailOrMobile"]').value.trim();
    const password = form.querySelector('input[name="password"]').value.trim();
    if (!emailOrMobile || !password) return showToast("Please fill in all fields", "error");

    try {
        const response = await fetch('/spiceheritage/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ emailOrMobile, password })
        });
        const result = await response.json();
        if (response.ok && result.success) {
            isLoggedIn = true;
            currentUser = { name: result.name, email: result.email };
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            document.getElementById("authModal").classList.remove("active");
            updateAuthUI();
            showToast("Login successful!", "success");
        } else {
            showToast(result.message || "Invalid credentials.", "error");
        }
    } catch (error) {
        console.error("Login error:", error);
        showToast("An error occurred during login.", "error");
    }
}

async function handleRegister(form) {
    const name = form.querySelector('input[name="name"]').value.trim();
    const mobile = form.querySelector('input[name="mobile"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();
    const password = form.querySelector('input[name="password"]').value;
    const confirmPassword = form.querySelector('input[name="confirmPassword"]').value;

    const mobileRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[a-z0-9]+(?:[\._-][a-z0-9]+)*@\S+\.\S+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!name || !mobile || !email || !password || !confirmPassword) return showToast("Please fill in all fields", "error");
    if (!mobileRegex.test(mobile)) return showToast("Please enter a valid 10-digit mobile number.", "error");
    if (!emailRegex.test(email)) return showToast("Please enter a valid email address.", "error");
    if (!passwordRegex.test(password)) return showToast("Password must be 8+ characters and include uppercase, lowercase, number, and special character.", "error");
    if (password !== confirmPassword) return showToast("Passwords do not match.", "error");

    try {
        const response = await fetch('/spiceheritage/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ name, mobile, email, password })
        });

        const result = await response.json();

        if (result.success) {
            showToast("Registration successful! Please log in.", "success");
            document.querySelectorAll(".auth-form").forEach(f => f.classList.remove("active"));
            document.getElementById("loginForm").classList.add("active");
            document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
            document.querySelector('[data-tab="login"]').classList.add("active");
        } else {
            showToast(result.message || "Registration failed.", "error");
        }
    } catch (error) {
        console.error("Registration Error:", error);
        showToast("An error occurred during registration.", "error");
    }
}

async function handleForgotPassword(form) {
    const emailOrMobile = form.querySelector("input").value.trim();
    if (!emailOrMobile) return showToast("Please enter your email or mobile number", "error");
    showToast("Please check your email for a password reset link.", "success");
    document.querySelectorAll(".auth-form").forEach(f => f.classList.remove("active"));
    const resetForm = document.getElementById("resetPasswordForm");
    resetForm.classList.add("active");
    resetForm.querySelector('input[name="emailOrMobile"]').value = emailOrMobile;
}

async function handleResetPassword(form) {
    const emailOrMobile = form.querySelector('input[name="emailOrMobile"]').value;
    const newPassword = form.querySelector('input[name="newPassword"]').value;
    try {
        const response = await fetch('/spiceheritage/api/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ mobile: emailOrMobile, newPassword })
        });
        const result = await response.json();
        if (result.success) {
            showToast("Password has been reset! Please log in.", "success");
            document.querySelectorAll(".auth-form").forEach(f => f.classList.remove("active"));
            document.getElementById("loginForm").classList.add("active");
            document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
            document.querySelector('[data-tab="login"]').classList.add("active");
        } else {
            showToast(result.message, "error");
        }
    } catch (error) {
        console.error("Reset password error:", error);
        showToast("An error occurred while resetting the password.", "error");
    }
}

async function logout() {
    try {
        const response = await fetch('/spiceheritage/logout', { method: 'POST' });
        if (response.ok) {
            isLoggedIn = false;
            currentUser = null;
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("currentUser");
            updateAuthUI();
            showToast("Logged out successfully", "success");
            setTimeout(() => {
                window.location.href = "/spiceheritage/index.html";
            }, 500);
        } else {
            showToast("Logout failed on server.", "error");
        }
    } catch (error) {
        console.error("Logout error:", error);
        showToast("An error occurred during logout.", "error");
    }
}

function handleContactForm(form) {
    form.reset();
    showToast("Message sent successfully! We'll get back to you soon.", "success");
}

function handleSuggestForm(form) {
    form.reset();
    showToast("Thank you for your suggestion! We'll review it within 7 days.", "success");
}

function setupCatalogListeners() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    if (filterBtns.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener("click", function () {
                filterBtns.forEach(b => b.classList.remove("active"));
                this.classList.add("active");
                filterProducts(this.dataset.filter);
            });
        });
    }
    const sortSelect = document.getElementById("sortSelect");
    if (sortSelect) {
        sortSelect.addEventListener("change", () => sortProducts(sortSelect.value));
    }
}

function loadFeaturedProducts() {
    const container = document.getElementById("featuredProducts");
    if (!container) return;
    const featuredProducts = products.filter(p => p.popular).slice(0, 4);
    container.innerHTML = "";
    featuredProducts.forEach(product => container.appendChild(createProductCard(product)));
    
    setupFeaturedProductSlider();
}

/**
 * Sets up an automatic, looping slider for featured products on mobile.
 */
function setupFeaturedProductSlider() {
    if (window.innerWidth > 768) return;

    const container = document.getElementById('featuredProducts');
    if (!container) return;
    
    const cards = Array.from(container.children);
    const cardCount = cards.length;

    if (cardCount <= 1) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'products-grid-wrapper';
    container.parentNode.insertBefore(wrapper, container);
    wrapper.appendChild(container);

    cards.forEach(card => {
        const clone = card.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        container.appendChild(clone);
    });

    const animationName = 'slide';
    const totalWidthPercent = cardCount * 100;
    const animationDuration = cardCount * 5;

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes ${animationName} {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-${totalWidthPercent}%); }
        }
        .products-grid.sliding {
            animation: ${animationName} ${animationDuration}s linear infinite;
        }
    `;
    document.head.appendChild(style);

    container.style.width = `${totalWidthPercent * 2}%`;
    container.classList.add('sliding');

    wrapper.addEventListener('mouseenter', () => {
        container.style.animationPlayState = 'paused';
    });
    wrapper.addEventListener('mouseleave', () => {
        container.style.animationPlayState = 'running';
    });
}

function loadCatalogProducts() {
    const container = document.getElementById("catalogProducts");
    if (!container) return;
    container.innerHTML = "";
    products.forEach(product => container.appendChild(createProductCard(product)));
}

function createProductCard(product) {
    const card = document.createElement("div");
    card.className = "product-card";
    card.dataset.id = product.id;
    card.dataset.category = product.category;
    card.dataset.spiceLevel = product.spiceLevel;
    card.dataset.name = product.name;
    card.dataset.price = product.pricePerGram;
    card.dataset.popular = String(product.popular);
    card.innerHTML = `
        <div class="product-image"><img src="/spiceheritage/api/product-image?id=${product.id}" alt="${product.name}" loading="lazy"></div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="weight-options">
                <button class="weight-btn" data-weight="250">250g</button>
                <button class="weight-btn active" data-weight="500">500g</button>
                <button class="weight-btn" data-weight="1000">1kg</button>
                <button class="weight-btn custom-weight-btn" data-weight="custom">➕</button>
            </div>
            <div class="custom-weight-input">
                <input type="number" placeholder="Enter weight (250g multiples)" min="250" step="250" max="3000">
                <small>Custom quantities must be multiples of 250g</small>
            </div>
            <div class="product-price">₹${(product.pricePerGram * 500).toFixed(2)}</div>
            <button class="add-to-cart-btn" onclick="handleAddToCartClick(${product.id})">🛒 Add to Cart</button>
        </div>`;
    setupWeightSelection(card, product);
    return card;
}

function handleAddToCartClick(productId) {
    const card = document.querySelector(`.product-card[data-id='${productId}']`);
    const activeButton = card.querySelector(".weight-btn.active");
    let selectedWeight = 500;
    if (activeButton) {
        if (activeButton.dataset.weight === 'custom') {
            const customInput = card.querySelector('.custom-weight-input input');
            selectedWeight = parseInt(customInput.value, 10);
        } else {
            selectedWeight = parseInt(activeButton.dataset.weight, 10);
        }
    }
    if (!isNaN(selectedWeight)) {
        addToCart(productId, selectedWeight);
    }
}

function setupWeightSelection(card, product) {
    const weightBtns = card.querySelectorAll(".weight-btn");
    const customInput = card.querySelector(".custom-weight-input");
    const customInputField = customInput.querySelector("input");
    const priceElement = card.querySelector(".product-price");
    const addToCartBtn = card.querySelector(".add-to-cart-btn");
    weightBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            weightBtns.forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            if (this.dataset.weight === "custom") {
                customInput.classList.add("active");
                customInputField.focus();
                addToCartBtn.disabled = true;
                addToCartBtn.textContent = "Enter Weight";
            } else {
                customInput.classList.remove("active");
                const selectedWeight = Number(this.dataset.weight);
                priceElement.textContent = `₹${(product.pricePerGram * selectedWeight).toFixed(2)}`;
                addToCartBtn.disabled = false;
                addToCartBtn.textContent = "🛒 Add to Cart";
            }
        });
    });
    customInputField.addEventListener("input", function () {
        const weight = Number(this.value);
        if (weight && weight >= 250 && weight <= 5000 && weight % 250 === 0) {
            priceElement.textContent = `₹${(product.pricePerGram * weight).toFixed(2)}`;
            this.style.borderColor = "#F57C00";
            addToCartBtn.disabled = false;
            addToCartBtn.textContent = "🛒 Add to Cart";
        } else {
            this.style.borderColor = "#D90429";
            addToCartBtn.disabled = true;
            addToCartBtn.textContent = "Invalid Weight";
        }
    });
}

function addToCart(productId, weight) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const existingItem = cart.find(item => item.id === productId && item.weight === weight);
    if (existingItem) {
        existingItem.quantity++;
        showToast("Quantity updated in cart!", "success");
    } else {
        cart.push({
            id: productId,
            name: product.name,
            weight: weight,
            pricePerGram: product.pricePerGram,
            quantity: 1,
            totalPrice: product.pricePerGram * weight
        });
        showToast("Added to cart!", "success");
    }
    saveCart();
    updateCartUI();
}

function removeFromCart(productId, weight) {
    cart = cart.filter(item => !(item.id === productId && item.weight === weight));
    saveCart();
    updateCartUI();
    updateCartItems();
    showToast("Item removed from cart", "success");
}

function updateCartUI() {
    const cartBadge = document.getElementById("cartBadge");
    const cartItemCount = document.getElementById("cartItemCount");
    const cartTotal = document.getElementById("cartTotal");
    const cartSubtotal = document.getElementById("cartSubtotal");
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0);
    if (cartBadge) cartBadge.textContent = `₹${totalPrice.toFixed(2)}`;
    if (cartItemCount) cartItemCount.textContent = totalItems;
    if (cartTotal) cartTotal.textContent = `₹${totalPrice.toFixed(2)}`;
    if (cartSubtotal) cartSubtotal.textContent = `₹${totalPrice.toFixed(2)}`;
}

function updateCartItems() {
    const cartItemsContainer = document.getElementById("cartItems");
    if (!cartItemsContainer) return;
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart"><p>Your cart is empty!</p></div>';
        return;
    }
    cartItemsContainer.innerHTML = "";
    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.className = "cart-item";
        cartItemElement.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name} (${item.weight}g)</h4>
                <p>Quantity: ${item.quantity}</p>
                <button class="remove-item" onclick="removeFromCart(${item.id}, ${item.weight})">❌ Remove</button>
            </div>
            <div class="cart-item-price">₹${(item.totalPrice * item.quantity).toFixed(2)}</div>`;
        cartItemsContainer.appendChild(cartItemElement);
    });
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function filterProducts(filter) {
    const productCards = document.querySelectorAll(".product-card");
    productCards.forEach(card => {
        const category = card.dataset.category;
        const spiceLevel = card.dataset.spiceLevel;
        let shouldShow = false;
        if (filter === "all" || filter === category || (filter === 'spicy' && (spiceLevel === 'hot' || spiceLevel === 'extra-hot')) || (filter === 'mild' && spiceLevel === 'mild')) {
            shouldShow = true;
        }
        card.style.display = shouldShow ? "block" : "none";
    });
}

function sortProducts(sortBy) {
    const container = document.getElementById("catalogProducts");
    if (!container) return;
    const productCards = Array.from(container.querySelectorAll(".product-card"));
    productCards.sort((a, b) => {
        switch (sortBy) {
            case "name": return a.dataset.name.localeCompare(b.dataset.name);
            case "price-low": return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
            case "price-high": return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
            case "popular": return (b.dataset.popular === 'true') - (a.dataset.popular === 'true');
            default: return 0;
        }
    });
    productCards.forEach(card => container.appendChild(card));
}

function showToast(message, type = "info") {
    const toastContainer = document.getElementById("toastContainer");
    if (!toastContainer) return;
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-header">
            <span class="toast-title">${type.charAt(0).toUpperCase() + type.slice(1)}</span>
            <button class="toast-close">&times;</button>
        </div>
        <div class="toast-message">${message}</div>`;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 100);
    const closeBtn = toast.querySelector(".toast-close");
    const timer = setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 5000);
    closeBtn.addEventListener("click", () => {
        clearTimeout(timer);
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    });
}

function setupScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll(".product-card, .feature-card, .testimonial-card, .category-card");
    if (!elementsToAnimate.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    elementsToAnimate.forEach(el => {
        el.classList.add("scroll-animate");
        observer.observe(el);
    });
}

function applyFilterFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const filterValue = urlParams.get('filter');
    if (filterValue) {
        filterProducts(filterValue);
        const filterBtns = document.querySelectorAll(".filter-btn");
        filterBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === filterValue) btn.classList.add('active');
        });
    }
}