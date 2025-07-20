<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.spiceheritage.DAO.ProductDAO, com.spiceheritage.model.Product" %>
<%
    // Security check
    if (session.getAttribute("adminUser") == null) {
        response.sendRedirect(request.getContextPath() + "/admin/login.jsp");
        return;
    }

    // Get the product ID from the URL and fetch its data
    int productId = Integer.parseInt(request.getParameter("id"));
    ProductDAO productDAO = new ProductDAO();
    Product product = productDAO.getProductById(productId);
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Product - KNR Foods</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/styles.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/admin/admin-styles.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body class="admin-dashboard-body">
    <aside class="admin-sidebar">
        <div class="sidebar-header"><h3>KNR Foods - Admin</h3></div>
        <nav class="sidebar-nav">
            <ul>
                <li><a href="${pageContext.request.contextPath}/admin/dashboard.jsp"><i class="fas fa-tachometer-alt"></i> Dashboard</a></li>
                <li class="active"><a href="${pageContext.request.contextPath}/admin/products.jsp"><i class="fas fa-box-open"></i> Products</a></li>
                <li><a href="#"><i class="fas fa-shopping-cart"></i> Orders</a></li>
                <li><a href="#"><i class="fas fa-users"></i> Users</a></li>
                <li><a href="#"><i class="fas fa-lightbulb"></i> Suggestions</a></li>
            </ul>
        </nav>
    </aside>

    <div class="admin-main-content">
        <header class="admin-header">
            <h1>Edit Product: <%= product.getName() %></h1>
            <a href="${pageContext.request.contextPath}/admin/products.jsp" class="btn">&larr; Back to Products</a>
        </header>

        <main class="admin-page-content">
            <form class="admin-form" action="${pageContext.request.contextPath}/admin/products" method="POST">
                <input type="hidden" name="action" value="update">
                <input type="hidden" name="id" value="<%= product.getId() %>">
                
                <div class="form-group">
                    <label for="name">Product Name</label>
                    <input type="text" id="name" name="name" value="<%= product.getName() %>" required>
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea id="description" name="description" rows="4" required><%= product.getDescription() %></textarea>
                </div>
                <div class="form-group">
                    <label for="category">Category</label>
                    <select id="category" name="category" required>
                        <option value="veg" <%= "veg".equals(product.getCategory()) ? "selected" : "" %>>Vegetarian</option>
                        <option value="non-veg" <%= "non-veg".equals(product.getCategory()) ? "selected" : "" %>>Non-Vegetarian</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="spiceLevel">Spice Level</label>
                    <select id="spiceLevel" name="spiceLevel" required>
                        <option value="mild" <%= "mild".equals(product.getSpiceLevel()) ? "selected" : "" %>>Mild</option>
                        <option value="medium" <%= "medium".equals(product.getSpiceLevel()) ? "selected" : "" %>>Medium</option>
                        <option value="hot" <%= "hot".equals(product.getSpiceLevel()) ? "selected" : "" %>>Hot</option>
                        <option value="extra-hot" <%= "extra-hot".equals(product.getSpiceLevel()) ? "selected" : "" %>>Extra Hot</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="pricePerGram">Price Per Gram (₹)</label>
                    <input type="number" step="0.01" id="pricePerGram" name="pricePerGram" value="<%= product.getPricePerGram() %>" required>
                </div>
                <div class="form-group">
                    <label for="image">Image Path</label>
                    <input type="text" id="image" name="image" value="<%= product.getImage() %>" required>
                </div>
                <div class="form-group">
                    <label for="popular">Is Popular?</label>
                    <select id="popular" name="popular" required>
                        <option value="true" <%= product.isPopular() ? "selected" : "" %>>Yes</option>
                        <option value="false" <%= !product.isPopular() ? "selected" : "" %>>No</option>
                    </select>
                </div>

                <button type="submit" class="btn btn-add-new">Update Product</button>
            </form>
        </main>
    </div>
</body>
</html>
