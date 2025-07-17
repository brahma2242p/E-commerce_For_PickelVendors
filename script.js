// Global Variables
let cart = JSON.parse(localStorage.getItem("cart")) || []
let isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null

// Product Data
const products = [
  {
    id: 1,
    name: "Traditional Mango Pickle",
    description: "Authentic raw mango pickle with traditional spices",
    category: "veg",
    spiceLevel: "medium",
    pricePerGram: 0.33,
    image: "images/mango.jpeg",
    popular: true,
  },
  {
    id: 2,
    name: "Spicy Lemon Pickle",
    description: "Tangy lemon pickle with extra spices",
    category: "veg",
    spiceLevel: "hot",
    pricePerGram: 0.33,
    image: "images/lemon.jpg",
    popular: false,
  },
  {
    id: 3,
    name: "Goan Prawn Pickle",
    description: "Premium prawns in traditional Goan style",
    category: "non-veg",
    spiceLevel: "hot",
    pricePerGram: 2.02,
    image: "images/prawn.jpg",
    popular: true,
  },
  {
    id: 4,
    name: "Tamota Pickle",
    description: "Assorted vegetables in aromatic spices",
    category: "veg",
    spiceLevel: "mild",
    pricePerGram: 0.33,
    image: "images/tamota.jpg",
    popular: false,
  },
  {
    id: 5,
    name: "Oosiri Pickle",
    description: "Fresh Seasonal Oosiri  in mustard oil",
    category: "veg",
    spiceLevel: "medium",
    pricePerGram: 0.4,
    image: "images/Oosiri.jpg",
    popular: true,
  },
  {
    id: 6,
    name: "Mutton Pickle",
    description: "Fresh mutton in traditional Andhra style",
    category: "non-veg",
    spiceLevel: "extra-hot",
    pricePerGram: 2.8,
    image: "images/mutton.jpg",
    popular: false,
  },
  {
    id: 7,
    name: "Red Chili Pickle",
    description: "Fresh green chilies in mustard oil",
    category: "veg",
    spiceLevel: "extra-hot",
    pricePerGram: 0.3,
    image: "images/chilli.jpg",
    popular: true,
  },
  {
    id: 8,
    name: "Chicken Pickle",
    description: "Tender chicken pieces in aromatic spices",
    category: "non-veg",
    spiceLevel: "hot",
    pricePerGram: 1.2,
    image: "images/chicken.jpg",
    popular: false,
  },
]

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
  setupEventListeners()
  updateCartUI()
  updateAuthUI()

  // Load products if on homepage or catalog
  if (document.getElementById("featuredProducts")) {
    loadFeaturedProducts()
  }
  if (document.getElementById("catalogProducts")) {
    loadCatalogProducts()
    // Added function call to apply filter from URL on catalog page load
    applyFilterFromURL()
  }

  // Setup scroll animations
  setupScrollAnimations()
})

// Initialize App
function initializeApp() {
  // Setup navbar scroll effect
  window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar")
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(139, 0, 0, 0.95)"
      navbar.style.backdropFilter = "blur(10px)"
    } else {
      navbar.style.background = "#8B0000"
      navbar.style.backdropFilter = "none"
    }
  })

  // Setup smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Setup Event Listeners
function setupEventListeners() {
  // Mobile menu toggle
  const navButton = document.getElementById("navButton")
  const navMenu = document.querySelector(".nav-menu")

  if (navButton) {
    navButton.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      navButton.classList.toggle("active")
    })
  }

  // Profile icon click
  const profileIcon = document.getElementById("profileIcon")
  const profileDropdown = document.getElementById("profileDropdown")
  const authModal = document.getElementById("authModal")

  if (profileIcon) {
    profileIcon.addEventListener("click", (e) => {
      e.stopPropagation()
      if (isLoggedIn) {
        profileDropdown.classList.toggle("active")
      } else {
        authModal.classList.add("active")
      }
    })
  }

  // Cart icon click
  const cartIcon = document.getElementById("cartIcon")
  const cartPanel = document.getElementById("cartPanel")

  if (cartIcon) {
    cartIcon.addEventListener("click", () => {
      cartPanel.classList.add("active")
      updateCartItems()
    })
  }

  // Close cart panel
  const closeCart = document.getElementById("closeCart")
  if (closeCart) {
    closeCart.addEventListener("click", () => {
      cartPanel.classList.remove("active")
    })
  }

  // Keep shopping button
  const keepShoppingBtn = document.getElementById("keepShoppingBtn")
  if (keepShoppingBtn) {
    keepShoppingBtn.addEventListener("click", () => {
      cartPanel.classList.remove("active")
    })
  }

  // Checkout button
  const checkoutBtn = document.getElementById("checkoutBtn")
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (!isLoggedIn) {
        cartPanel.classList.remove("active")
        authModal.classList.add("active")
        showToast("Please login to proceed with checkout", "warning")
      } else {
        showToast("Redirecting to checkout...", "success")
        // Implement checkout logic here
      }
    })
  }

  // Auth modal event listeners
  setupAuthModalListeners()

  // Form submissions
  setupFormSubmissions()

  // Filter and sort listeners (for catalog page)
  setupCatalogListeners()

  // Close dropdowns when clicking outside
  document.addEventListener("click", () => {
    if (profileDropdown) {
        profileDropdown.classList.remove("active")
    }
  })
}

// Setup Auth Modal Listeners
function setupAuthModalListeners() {
  const authModal = document.getElementById("authModal")
  const closeAuthModal = document.getElementById("closeAuthModal")
  const tabBtns = document.querySelectorAll(".tab-btn")
  const authForms = document.querySelectorAll(".auth-form")
  const forgotPasswordLink = document.querySelector(".forgot-password")
  const backToLoginBtn = document.querySelector(".back-to-login")
  const togglePasswordBtns = document.querySelectorAll(".toggle-password")

  // Close modal
  if (closeAuthModal) {
    closeAuthModal.addEventListener("click", () => {
      authModal.classList.remove("active")
    })
  }

  // Tab switching
  if (tabBtns.length > 0) {
    tabBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
        const tab = this.dataset.tab

        // Update active tab
        tabBtns.forEach((b) => b.classList.remove("active"))
        this.classList.add("active")

        // Show corresponding form
        authForms.forEach((form) => {
            form.classList.remove("active")
            if (form.id === tab + "Form") {
            form.classList.add("active")
            }
        })
        })
    })
  }

  // Forgot password link
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener("click", (e) => {
      e.preventDefault()
      authForms.forEach((form) => form.classList.remove("active"))
      document.getElementById("forgotPasswordForm").classList.add("active")
    })
  }

  // Back to login
  if (backToLoginBtn) {
    backToLoginBtn.addEventListener("click", () => {
      authForms.forEach((form) => form.classList.remove("active"))
      document.getElementById("loginForm").classList.add("active")

      // Reset tab buttons
      tabBtns.forEach((b) => b.classList.remove("active"))
      document.querySelector('[data-tab="login"]').classList.add("active")
    })
  }

  // Toggle password visibility
  if (togglePasswordBtns.length > 0) {
    togglePasswordBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
        const input = this.parentElement.querySelector("input")
        const icon = this.querySelector("i")

        if (input.type === "password") {
            input.type = "text"
            icon.classList.remove("fa-eye")
            icon.classList.add("fa-eye-slash")
        } else {
            input.type = "password"
            icon.classList.remove("fa-eye-slash")
            icon.classList.add("fa-eye")
        }
        })
    })
  }

  // Logout functionality
  const logoutBtn = document.querySelector(".logout-btn")
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      logout()
    })
  }
}

// Setup Form Submissions
function setupFormSubmissions() {
  // Login form
  const loginForm = document.getElementById("loginFormSubmit")
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault()
      handleLogin(this)
    })
  }

  // Register form
  const registerForm = document.getElementById("registerFormSubmit")
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault()
      handleRegister(this)
    })
  }

  // Forgot password form
  const forgotPasswordForm = document.getElementById("forgotPasswordSubmit")
  if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener("submit", function (e) {
      e.preventDefault()
      handleForgotPassword(this)
    })
  }

  // Contact form
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()
      handleContactForm(this)
    })
  }

  // Subscribe form
  const subscribeForm = document.getElementById("subscribeForm")
  if (subscribeForm) {
    subscribeForm.addEventListener("submit", function (e) {
      e.preventDefault()
      handleSubscribe(this)
    })
  }

  // Suggest form
  const suggestForm = document.getElementById("suggestForm")
  if (suggestForm) {
    suggestForm.addEventListener("submit", function (e) {
      e.preventDefault()
      handleSuggestForm(this)
    })
  }
}

// Setup Catalog Listeners
function setupCatalogListeners() {
  // Filter buttons
  const filterBtns = document.querySelectorAll(".filter-btn")
  if (filterBtns.length > 0) {
    filterBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
        filterBtns.forEach((b) => b.classList.remove("active"))
        this.classList.add("active")

        const filter = this.dataset.filter
        filterProducts(filter)
        
        })
    })
  }

  // Sort select
  const sortSelect = document.getElementById("sortSelect")
  if (sortSelect) {
    sortSelect.addEventListener("change", function () {
      sortProducts(this.value)
    })
  }
}

// Load Featured Products
function loadFeaturedProducts() {
  const container = document.getElementById("featuredProducts")
  if (!container) return

  const featuredProducts = products.filter((p) => p.popular).slice(0, 4)
  container.innerHTML = ""

  featuredProducts.forEach((product) => {
    const productCard = createProductCard(product)
    container.appendChild(productCard)
  })
}

// Load Catalog Products
function loadCatalogProducts() {
  const container = document.getElementById("catalogProducts")
  if (!container) return

  container.innerHTML = ""

  products.forEach((product) => {
    const productCard = createProductCard(product)
    container.appendChild(productCard)
  })
}

// Create Product Card
function createProductCard(product) {
  const card = document.createElement("div")
  card.className = "product-card"
  card.dataset.category = product.category
  card.dataset.spiceLevel = product.spiceLevel
  card.dataset.name = product.name; 
  card.dataset.price = product.pricePerGram;
  card.dataset.popular = String(product.popular);


  card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>
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
            <button class="add-to-cart-btn" onclick="addToCart(${product.id}, 500)">
                🛒 Add to Cart
            </button>
        </div>
    `

  // Setup weight selection
  setupWeightSelection(card, product)

  return card
}

// Setup Weight Selection
function setupWeightSelection(card, product) {
  const weightBtns = card.querySelectorAll(".weight-btn")
  const customInput = card.querySelector(".custom-weight-input")
  const customInputField = customInput.querySelector("input")
  const priceElement = card.querySelector(".product-price")
  const addToCartBtn = card.querySelector(".add-to-cart-btn")

  let selectedWeight = 500

  weightBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      weightBtns.forEach((b) => b.classList.remove("active"))
      this.classList.add("active")

      if (this.dataset.weight === "custom") {
        customInput.classList.add("active")
        customInputField.focus()
        addToCartBtn.disabled = true;
        addToCartBtn.textContent = "Enter Weight";
      } else {
        customInput.classList.remove("active")
        selectedWeight = Number.parseInt(this.dataset.weight)
        updatePrice()
        updateAddToCartButton()
      }
    })
  })

  customInputField.addEventListener("input", function () {
    const weight = Number.parseInt(this.value)

    if (weight && weight >= 250 && weight <= 3000 && weight % 250 === 0) {
      selectedWeight = weight
      updatePrice()
      updateAddToCartButton()
      this.style.borderColor = "#F57C00"
    } else {
      this.style.borderColor = "#D90429"
      addToCartBtn.disabled = true
      addToCartBtn.textContent = "Invalid Weight"
    }
  })

  function updatePrice() {
    const price = (product.pricePerGram * selectedWeight).toFixed(2)
    priceElement.textContent = `₹${price}`
  }

  function updateAddToCartButton() {
    addToCartBtn.disabled = false
    addToCartBtn.textContent = "🛒 Add to Cart"
    addToCartBtn.onclick = () => addToCart(product.id, selectedWeight)
  }
}

// Add to Cart Function
function addToCart(productId, weight) {
  const product = products.find((p) => p.id === productId)
  if (!product) return

  const existingItem = cart.find((item) => item.id === productId && item.weight === weight)

  if (existingItem) {
    existingItem.quantity += 1
    showToast("Quantity updated in cart!", "success")
  } else {
    const cartItem = {
      id: productId,
      name: product.name,
      image: product.image,
      weight: weight,
      pricePerGram: product.pricePerGram,
      quantity: 1,
      totalPrice: product.pricePerGram * weight,
    }

    cart.push(cartItem)
    showToast("Added to cart!", "success")
  }

  saveCart()
  updateCartUI()
}

// Remove from Cart
function removeFromCart(productId, weight) {
  cart = cart.filter((item) => !(item.id === productId && item.weight === weight))
  saveCart()
  updateCartUI()
  updateCartItems()
  showToast("Item removed from cart", "success")
}

// Update Cart UI
function updateCartUI() {
  const cartBadge = document.getElementById("cartBadge")
  const cartItemCount = document.getElementById("cartItemCount")
  const cartTotal = document.getElementById("cartTotal")
  const cartSubtotal = document.getElementById("cartSubtotal")

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0)

  if (cartBadge) cartBadge.textContent = `₹${totalPrice.toFixed(2)}`
  if (cartItemCount) cartItemCount.textContent = totalItems
  if (cartTotal) cartTotal.textContent = `₹${totalPrice.toFixed(2)}`
  if (cartSubtotal) cartSubtotal.textContent = `₹${totalPrice.toFixed(2)}`
}

// Update Cart Items Display
function updateCartItems() {
  const cartItemsContainer = document.getElementById("cartItems")
  if (!cartItemsContainer) return

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<div class="empty-cart"><p>Your cart is empty!</p></div>'
    return
  }

  cartItemsContainer.innerHTML = ""

  cart.forEach((item) => {
    const cartItemElement = document.createElement("div")
    cartItemElement.className = "cart-item"

    cartItemElement.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name} (${item.weight}g)</h4>
                <p>Quantity: ${item.quantity}</p>
                <button class="remove-item" onclick="removeFromCart(${item.id}, ${item.weight})">❌ Remove</button>
            </div>
            <div class="cart-item-price">₹${(item.totalPrice * item.quantity).toFixed(2)}</div>
        `

    cartItemsContainer.appendChild(cartItemElement)
  })
}

// Save Cart to LocalStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart))
}

// Authentication Functions
function handleLogin(form) {
  const email = form.querySelector('input[type="text"]').value
  const password = form.querySelector('input[type="password"]').value

  if (email && password) {
    isLoggedIn = true
    currentUser = {
      email: email,
      name: email.split("@")[0] || "User",
    }
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("currentUser", JSON.stringify(currentUser))
    document.getElementById("authModal").classList.remove("active")
    updateAuthUI()
    showToast("Login successful!", "success")
  } else {
    showToast("Please fill in all fields", "error")
  }
}

function handleRegister(form) {
  const inputs = form.querySelectorAll("input")
  const name = inputs[0].value
  const mobile = inputs[1].value
  const email = inputs[2].value
  const password = inputs[3].value
  const confirmPassword = inputs[4].value

  if (!name || !mobile || !email || !password || !confirmPassword) {
    showToast("Please fill in all fields", "error")
    return
  }
  if (mobile.length !== 10 || !/^\d+$/.test(mobile)) {
    showToast("Please enter a valid 10-digit mobile number", "error")
    return
  }
  if (password !== confirmPassword) {
    showToast("Passwords do not match", "error")
    return
  }

  isLoggedIn = true
  currentUser = { name, email, mobile }
  localStorage.setItem("isLoggedIn", "true")
  localStorage.setItem("currentUser", JSON.stringify(currentUser))
  document.getElementById("authModal").classList.remove("active")
  updateAuthUI()
  showToast("Registration successful!", "success")
}

function handleForgotPassword(form) {
  const email = form.querySelector("input").value
  if (!email) {
    showToast("Please enter your email or mobile", "error")
    return
  }
  showToast("OTP sent successfully! (This is a demo)", "success")
  setTimeout(() => {
    showToast("Password reset link sent to your email", "success")
  }, 2000)
}

function logout() {
  isLoggedIn = false
  currentUser = null
  localStorage.removeItem("isLoggedIn")
  localStorage.removeItem("currentUser")
  updateAuthUI()
  showToast("Logged out successfully", "success")
}

function updateAuthUI() {
  const profileIcon = document.getElementById("profileIcon")
  if (!profileIcon) return;

  if (isLoggedIn && currentUser) {
    profileIcon.innerHTML = `<span style="font-weight: bold;">${currentUser.name.charAt(0).toUpperCase()}</span>`
    profileIcon.style.background = "var(--primary-orange)"
    profileIcon.style.borderRadius = "50%"
    profileIcon.style.width = "35px"
    profileIcon.style.height = "35px"
    profileIcon.style.display = "flex"
    profileIcon.style.alignItems = "center"
    profileIcon.style.justifyContent = "center"
  } else {
    profileIcon.innerHTML = '<i class="fas fa-user"></i>'
    profileIcon.style.background = "none"
    profileIcon.style.width = "auto"
    profileIcon.style.height = "auto"
  }
}

// Form Handlers
function handleContactForm(form) {
  form.reset()
  showToast("Message sent successfully! We'll get back to you soon.", "success")
}

function handleSubscribe(form) {
  const email = form.querySelector('input[type="email"]').value
  if (email && email.includes("@")) {
    showToast("Successfully subscribed to our newsletter!", "success")
    form.reset()
  } else {
    showToast("Please enter a valid email address", "error")
  }
}

function handleSuggestForm(form) {
  form.reset()
  showToast("Thank you for your suggestion! We'll review it within 7 days.", "success")
}

// Filter and Sort Functions
function filterProducts(filter) {
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((card) => {
    const category = card.dataset.category;
    const spiceLevel = card.dataset.spiceLevel;
    let shouldShow = false;

    if (filter === "all") {
      shouldShow = true;
    } else if (filter === 'veg' && category === 'veg') {
      shouldShow = true;
    } else if (filter === 'non-veg' && category === 'non-veg') {
      shouldShow = true;
    } else if (filter === 'spicy' && (spiceLevel === 'hot' || spiceLevel === 'extra-hot')) {
      shouldShow = true;
    } else if (filter === 'mild' && spiceLevel === 'mild') {
      shouldShow = true;
    }

    card.style.display = shouldShow ? "block" : "none";
  });
}

function sortProducts(sortBy) {
  const container = document.getElementById("catalogProducts")
  if (!container) return

  const productCards = Array.from(container.querySelectorAll(".product-card"))

  productCards.sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.dataset.name.localeCompare(b.dataset.name)
      case "price-low":
        return parseFloat(a.dataset.price) - parseFloat(b.dataset.price)
      case "price-high":
        return parseFloat(b.dataset.price) - parseFloat(a.dataset.price)
      case "popular":
        return (b.dataset.popular === 'true') - (a.dataset.popular === 'true')
      default:
        return 0
    }
  })

  productCards.forEach((card) => container.appendChild(card))
}

// Toast Notification System
function showToast(message, type = "info") {
  const toastContainer = document.getElementById("toastContainer")
  if (!toastContainer) return

  const toast = document.createElement("div")
  toast.className = `toast ${type}`

  toast.innerHTML = `
        <div class="toast-header">
            <span class="toast-title">${type.charAt(0).toUpperCase() + type.slice(1)}</span>
            <button class="toast-close">&times;</button>
        </div>
        <div class="toast-message">${message}</div>
    `

  toastContainer.appendChild(toast)
  setTimeout(() => toast.classList.add("show"), 100)

  const closeBtn = toast.querySelector(".toast-close");
  const timer = setTimeout(() => {
    toast.classList.remove("show")
    setTimeout(() => toast.remove(), 300)
  }, 5000)

  closeBtn.addEventListener("click", () => {
    clearTimeout(timer);
    toast.classList.remove("show")
    setTimeout(() => toast.remove(), 300)
  })
}

// Scroll Animations
function setupScrollAnimations() {
  const elementsToAnimate = document.querySelectorAll(".product-card, .feature-card, .testimonial-card, .category-card");
  if (elementsToAnimate.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate")
        observer.unobserve(entry.target);
      }
    })
  }, { threshold: 0.1 });

  elementsToAnimate.forEach((el) => {
    el.classList.add("scroll-animate")
    observer.observe(el)
  })
}

// New function to read URL and apply filter (with debugging)
function applyFilterFromURL() {
    console.log("Catalog page loaded. Checking for URL filter...");
    const urlParams = new URLSearchParams(window.location.search);
    const filterValue = urlParams.get('filter');

    if (filterValue) {
        console.log("Filter found in URL:", filterValue);
        
        // Apply the product filter
        console.log("Applying filter for:", filterValue);
        filterProducts(filterValue);

        // Update the active state of the filter buttons
        const filterBtns = document.querySelectorAll(".filter-btn");
        let foundButton = false;
        filterBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === filterValue) {
                btn.classList.add('active');
                foundButton = true;
            }
        });
        if(foundButton) {
            console.log("Highlighting button for:", filterValue);
        } else {
            console.log("Could not find a button to highlight for:", filterValue);
        }
    } else {
        console.log("No filter found in URL.");
    }
}

// Service Worker Registration (for PWA capabilities)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .catch((err) => {
        console.log("ServiceWorker registration failed: ", err)
      })
  })
}
