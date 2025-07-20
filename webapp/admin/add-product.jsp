<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%
    // Security check
    if (session.getAttribute("adminUser") == null) {
        response.sendRedirect(request.getContextPath() + "/admin/login.jsp");
        return;
    }
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Product - KNR Foods</title>
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
            <h1>Add New Product</h1>
            <a href="${pageContext.request.contextPath}/admin/products.jsp" class="btn">&larr; Back to Products</a>
        </header>

        <main class="admin-page-content">
            <form class="admin-form" action="${pageContext.request.contextPath}/admin/products" method="POST">
                <input type="hidden" name="action" value="add">
                
                <div class="form-group">
                    <label for="name">Product Name</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea id="description" name="description" rows="4" required></textarea>
                </div>
                <div class="form-group">
                    <label for="category">Category</label>
                    <select id="category" name="category" required>
                        <option value="veg">Vegetarian</option>
                        <option value="non-veg">Non-Vegetarian</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="spiceLevel">Spice Level</label>
                    <select id="spiceLevel" name="spiceLevel" required>
                        <option value="mild">Mild</option>
                        <option value="medium">Medium</option>
                        <option value="hot">Hot</option>
                        <option value="extra-hot">Extra Hot</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="pricePerGram">Price Per Gram (₹)</label>
                    <input type="number" step="0.01" id="pricePerGram" name="pricePerGram" required>
                </div>
                <div class="form-group">
                    <label for="image">Image Path</label>
                    <input type="text" id="image" name="image" placeholder="e.g., images/mango.jpeg" required>
                </div>
                <div class="form-group">
                    <label for="popular">Is Popular? (Featured on homepage)</label>
                    <select id="popular" name="popular" required>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>

                <button type="submit" class="btn btn-add-new">Save Product</button>
            </form>
        </main>
    </div>
</body>
</html>
