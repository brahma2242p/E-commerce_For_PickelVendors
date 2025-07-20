// Global Variables
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
// This global array will be filled with data from your backend API.
let products = [];

// DOM Content Loaded - This is now an ASYNC function to allow 'await'
document.addEventListener("DOMContentLoaded", async () => {
    // 1. First, 'await' the fetchProducts() call. This pauses execution
    //    until the data has been successfully fetched from your backend.
    products = await fetchProducts();

    // 2. Now that the global 'products' array has data, run all your original functions.
    //    They will automatically use the live data from the global array.
    initializeApp();
    setupEventListeners();
    updateCartUI();
    updateAuthUI();

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
 * NEW: This function fetches the product data from your Java backend API.
 */
async function fetchProducts() {
    try {
        // This URL must match the one that works in your browser.
        const response = await fetch('http://localhost:8080/spiceheritage/api/products');
        if (!response.ok) {
            throw new Error(`Network response was not ok. Status: ${response.status}`);
        }
        console.log("Successfully fetched products from API.");
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch products:", error);
        // Return an empty array to prevent the rest of the site from breaking on an error.
        return [];
    }
}

// Initialize App (Your original function - no changes needed)
function initializeApp() {
    window.addEventListener("scroll", () => {
        const navbar = document.getElementById("navbar");
        if (window.scrollY > 50) {
            navbar.style.background = "rgba(139, 0, 0, 0.95)";
            navbar.style.backdropFilter = "blur(10px)";
        } else {
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

// Setup Event Listeners (Your original function - no changes needed)
function setupEventListeners() {
    const navButton = document.getElementById("navButton");
    const navMenu = document.querySelector(".nav-menu");
    if (navButton) {
        navButton.addEventListener("click", () => {
            navMenu.classList.toggle("active");
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
                profileDropdown.classList.toggle("active");
            } else {
                authModal.classList.add("active");
            }
        });
    }
    const cartIcon = document.getElementById("cartIcon");
    const cartPanel = document.getElementById("cartPanel");
    if (cartIcon) {
        cartIcon.addEventListener("click", () => {
            cartPanel.classList.add("active");
            updateCartItems();
        });
    }
    const closeCart = document.getElementById("closeCart");
    if (closeCart) {
        closeCart.addEventListener("click", () => {
            cartPanel.classList.remove("active");
        });
    }
    const keepShoppingBtn = document.getElementById("keepShoppingBtn");
    if (keepShoppingBtn) {
        keepShoppingBtn.addEventListener("click", () => {
            cartPanel.classList.remove("active");
        });
    }
    
    // CORRECTED: This is the updated checkout button logic
    const checkoutBtn = document.getElementById("checkoutBtn");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            if (!isLoggedIn) {
                cartPanel.classList.remove("active");
                authModal.classList.add("active");
                showToast("Please login to proceed with checkout", "warning");
            } else {
                // This line now correctly navigates to your checkout page
                window.location.href = "/spiceheritage/checkout";
            }
        });
    }

    setupAuthModalListeners();
    setupFormSubmissions();
    setupCatalogListeners();
    document.addEventListener("click", () => {
        if (profileDropdown) {
            profileDropdown.classList.remove("active");
        }
    });
}

// Setup Auth Modal Listeners (Your original function - no changes needed)
function setupAuthModalListeners() {
    const authModal = document.getElementById("authModal");
    const closeAuthModal = document.getElementById("closeAuthModal");
    const tabBtns = document.querySelectorAll(".tab-btn");
    const authForms = document.querySelectorAll(".auth-form");
    const forgotPasswordLink = document.querySelector(".forgot-password");
    const backToLoginBtn = document.querySelector(".back-to-login");
    const togglePasswordBtns = document.querySelectorAll(".toggle-password");
    if (closeAuthModal) {
        closeAuthModal.addEventListener("click", () => authModal.classList.remove("active"));
    }
    if (tabBtns.length) {
        tabBtns.forEach(btn => {
            btn.addEventListener("click", function () {
                tabBtns.forEach(b => b.classList.remove("active"));
                this.classList.add("active");
                authForms.forEach(form => form.id === `${this.dataset.tab}Form` ? form.classList.add("active") : form.classList.remove("active"));
            });
        });
    }
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener("click", (e) => {
            e.preventDefault();
            authForms.forEach(form => form.classList.remove("active"));
            document.getElementById("forgotPasswordForm").classList.add("active");
        });
    }
    if (backToLoginBtn) {
        backToLoginBtn.addEventListener("click", () => {
            authForms.forEach(form => form.classList.remove("active"));
            document.getElementById("loginForm").classList.add("active");
            tabBtns.forEach(b => b.classList.remove("active"));
            document.querySelector('[data-tab="login"]').classList.add("active");
        });
    }
    if (togglePasswordBtns.length) {
        togglePasswordBtns.forEach(btn => {
            btn.addEventListener("click", function () {
                const input = this.parentElement.querySelector("input");
                input.type = input.type === "password" ? "text" : "password";
                this.querySelector("i").classList.toggle("fa-eye");
                this.querySelector("i").classList.toggle("fa-eye-slash");
            });
        });
    }
    const logoutBtn = document.querySelector(".logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", logout);
    }
}

// Setup Form Submissions (Your original function - no changes needed)
function setupFormSubmissions() {
    const loginForm = document.getElementById("loginFormSubmit");
    if (loginForm) loginForm.addEventListener("submit", (e) => { e.preventDefault(); handleLogin(loginForm); });
    const registerForm = document.getElementById("registerFormSubmit");
    if (registerForm) registerForm.addEventListener("submit", (e) => { e.preventDefault(); handleRegister(registerForm); });
    const forgotPasswordForm = document.getElementById("forgotPasswordSubmit");
    if (forgotPasswordForm) forgotPasswordForm.addEventListener("submit", (e) => { e.preventDefault(); handleForgotPassword(forgotPasswordForm); });
    const contactForm = document.getElementById("contactForm");
    if (contactForm) contactForm.addEventListener("submit", (e) => { e.preventDefault(); handleContactForm(contactForm); });
    const subscribeForm = document.getElementById("subscribeForm");
    if (subscribeForm) subscribeForm.addEventListener("submit", (e) => { e.preventDefault(); handleSubscribe(subscribeForm); });
    const suggestForm = document.getElementById("suggestForm");
    if (suggestForm) suggestForm.addEventListener("submit", (e) => { e.preventDefault(); handleSuggestForm(suggestForm); });
}

// Setup Catalog Listeners (Your original function - no changes needed)
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

// Load Featured Products (Your original function - no changes needed)
function loadFeaturedProducts() {
    const container = document.getElementById("featuredProducts");
    if (!container) return;
    const featuredProducts = products.filter(p => p.popular).slice(0, 4);
    container.innerHTML = "";
    featuredProducts.forEach(product => container.appendChild(createProductCard(product)));
}

// Load Catalog Products (Your original function - no changes needed)
function loadCatalogProducts() {
    const container = document.getElementById("catalogProducts");
    if (!container) return;
    container.innerHTML = "";
    products.forEach(product => container.appendChild(createProductCard(product)));
}

// Create Product Card (Your original function - no changes needed)
function createProductCard(product) {
    const card = document.createElement("div");
    card.className = "product-card";
    card.dataset.id = product.id; // Added data-id for cart logic
    card.dataset.category = product.category;
    card.dataset.spiceLevel = product.spiceLevel;
    card.dataset.name = product.name;
    card.dataset.price = product.pricePerGram;
    card.dataset.popular = String(product.popular);
    card.innerHTML = `
        <div class="product-image"><img src="${product.image}" alt="${product.name}" loading="lazy"></div>
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

// New helper function to handle the 'Add to Cart' click
function handleAddToCartClick(productId) {
    const card = document.querySelector(`.product-card[data-id='${productId}']`);
    const activeButton = card.querySelector(".weight-btn.active");
    let selectedWeight = 500; // Default weight
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

// Setup Weight Selection (Your original function - no changes needed)
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
        if (weight && weight >= 250 && weight <= 3000 && weight % 250 === 0) {
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

// Add to Cart Function (Your original function - no changes needed)
function addToCart(productId, weight) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const existingItem = cart.find(item => item.id === productId && item.weight === weight);
    if (existingItem) {
        existingItem.quantity++;
        showToast("Quantity updated in cart!", "success");
    } else {
        cart.push({
            id: productId, name: product.name, image: product.image, weight: weight,
            pricePerGram: product.pricePerGram, quantity: 1, totalPrice: product.pricePerGram * weight
        });
        showToast("Added to cart!", "success");
    }
    saveCart();
    updateCartUI();
}

// --- The rest of your original functions are below and unchanged ---
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
async function handleLogin(form) {
    const emailOrMobileInput = form.querySelector('input[placeholder="Email or Mobile"]');
    const passwordInput = form.querySelector('input[placeholder="Password"]');
    if (!emailOrMobileInput || !passwordInput) {
        console.error("Login form inputs not found!");
        return;
    }
    const emailOrMobile = emailOrMobileInput.value.trim();
    const password = passwordInput.value.trim();
    if (!emailOrMobile || !password) {
        showToast("Please fill in all fields", "error");
        return;
    }
    try {
        const response = await fetch('http://localhost:8080/spiceheritage/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ emailOrMobile: emailOrMobile, password: password })
        });
        const result = await response.json();
        if (result.success) {
            isLoggedIn = true;
            currentUser = { name: result.name, email: result.email };
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            document.getElementById("authModal").classList.remove("active");
            updateAuthUI();
            showToast("Login successful!", "success");
        } else {
            showToast("Invalid mobile number or password. Please try again.", "error");
        }
    } catch (error) {
        console.error("Login submission error:", error);
        showToast("An error occurred during login. Please try again.", "error");
    }
}
async function handleRegister(form) {
    const nameInput = form.querySelector('input[name="name"]');
    const mobileInput = form.querySelector('input[name="mobile"]');
    const emailInput = form.querySelector('input[name="email"]');
    const passwordInput = form.querySelector('input[name="password"]');
    const confirmPasswordInput = form.querySelector('input[name="confirmPassword"]');
    if (!nameInput || !mobileInput || !emailInput || !passwordInput || !confirmPasswordInput) {
        console.error("Registration form inputs not found!");
        return;
    }
    const name = nameInput.value.trim();
    const mobile = mobileInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const mobileRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[a-z0-9]+(?:[\._-][a-z0-9]+)*@\S+\.\S+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!name || !mobile || !email || !password || !confirmPassword) return showToast("Please fill in all fields", "error");
    if (!mobileRegex.test(mobile)) return showToast("Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9", "error");
    if (!emailRegex.test(email)) return showToast("Please enter a valid email address (lowercase, no special characters)", "error");
    if (!passwordRegex.test(password)) return showToast("Password must be 8+ characters and include uppercase, lowercase, number, and special character", "error");
    if (password !== confirmPassword) return showToast("Passwords do not match", "error");
    try {
        const response = await fetch('http://localhost:8080/spiceheritage/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ name, mobile, email, password })
        });
        const result = await response.json();
        if (result.success) {
            showToast("Registration successful!", "success");
            document.getElementById("authModal").classList.remove("active");
        } else {
            showToast("Registration failed. Email or mobile may already be in use.", "error");
        }
    } catch (error) {
        console.error("Registration submission error:", error);
        showToast("An error occurred during registration. Please try again.", "error");
    }
}
function handleForgotPassword(form) {
    const emailOrMobileInput = form.querySelector("input").value.trim();
    if (!emailOrMobileInput) return showToast("Please enter your email or mobile number", "error");
    const isEmail = emailOrMobileInput.includes('@');
    const isMobile = /^\d{10}$/.test(emailOrMobileInput);
    if (!isEmail && !isMobile) return showToast("Please enter a valid Email or 10-digit Mobile Number", "error");
    showToast("Password reset link sent successfully! (This is a demo)", "success");
}
function logout() {
    isLoggedIn = false;
    currentUser = null;
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    updateAuthUI();
    showToast("Logged out successfully", "success");
    window.location.href = "/spiceheritage/index.html";
}
function updateAuthUI() {
    const profileIcon = document.getElementById("profileIcon");
    if (!profileIcon) return;
    if (isLoggedIn && currentUser) {
        profileIcon.innerHTML = `<span style="font-weight: bold;">${currentUser.name.charAt(0).toUpperCase()}</span>`;
        profileIcon.style.cssText = "background: var(--primary-orange); border-radius: 50%; width: 35px; height: 35px; display: flex; align-items: center; justify-content: center;";
    } else {
        profileIcon.innerHTML = '<i class="fas fa-user"></i>';
        profileIcon.style.cssText = "background: none; width: auto; height: auto;";
    }
}
function handleContactForm(form) {
    form.reset();
    showToast("Message sent successfully! We'll get back to you soon.", "success");
}
function handleSubscribe(form) {
    const email = form.querySelector('input[type="email"]').value;
    if (email && email.includes("@")) {
        showToast("Successfully subscribed to our newsletter!", "success");
        form.reset();
    } else {
        showToast("Please enter a valid email address", "error");
    }
}
function handleSuggestForm(form) {
    form.reset();
    showToast("Thank you for your suggestion! We'll review it within 7 days.", "success");
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
    console.log("Catalog page loaded. Checking for URL filter...");
    const urlParams = new URLSearchParams(window.location.search);
    const filterValue = urlParams.get('filter');
    if (filterValue) {
        console.log("Filter found in URL:", filterValue);
        filterProducts(filterValue);
        const filterBtns = document.querySelectorAll(".filter-btn");
        filterBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === filterValue) btn.classList.add('active');
        });
        console.log("Highlighting button for:", filterValue);
    } else {
        console.log("No filter found in URL.");
    }
}
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").catch(err => {
            console.log("ServiceWorker registration failed: ", err);
        });
    });
}