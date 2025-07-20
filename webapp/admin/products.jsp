<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.spiceheritage.DAO.ProductDAO, com.spiceheritage.model.Product, java.util.List" %>
<%
    if (session.getAttribute("adminUser") == null) {
        response.sendRedirect(request.getContextPath() + "/admin/login.jsp");
        return;
    }
    ProductDAO productDAO = new ProductDAO();
    List<Product> productList = productDAO.getAllProducts();
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Products - KNR Foods</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/styles.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/admin/admin-styles.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body class="admin-dashboard-body">

    <aside class="admin-sidebar">
        <div class="sidebar-header">
            <h3>KNR Foods - Admin</h3>
        </div>
        <nav class="sidebar-nav">
            <ul>
                <li><a href="${pageContext.request.contextPath}/admin/dashboard.jsp"><i class="fas fa-tachometer-alt"></i> Dashboard</a></li>
                <li class="active"><a href="${pageContext.request.contextPath}/admin/products.jsp"><i class="fas fa-box-open"></i> Products</a></li>
                <!-- CORRECTED: This link now points to your orders page -->
                <li><a href="${pageContext.request.contextPath}/admin/orders.jsp"><i class="fas fa-shopping-cart"></i> Orders</a></li>
                <li><a href="${pageContext.request.contextPath}/admin/users.jsp"><i class="fas fa-users"></i> Users</a></li>
                <li><a href="#"><i class="fas fa-lightbulb"></i> Suggestions</a></li>
            </ul>
        </nav>
    </aside>

    <!-- Main Content -->
    <div class="admin-main-content">
        <header class="admin-header">
            <h1>Product Management</h1>
            <div class="admin-user-info">
                <span>Welcome, <strong><%= session.getAttribute("adminUser") %></strong></span>
                <a href="${pageContext.request.contextPath}/admin/logout" class="logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</a>
            </div>
        </header>

        <main class="admin-page-content">
            <div class="content-header">
                <h2>All Products</h2>
                <a href="${pageContext.request.contextPath}/admin/add-product.jsp" class="btn btn-add-new"><i class="fas fa-plus"></i> Add New Product</a>
            </div>

            <table class="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price/Gram</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <% for (Product product : productList) { %>
                        <tr>
                            <td><%= product.getId() %></td>
                            <td><%= product.getName() %></td>
                            <td><%= product.getCategory() %></td>
                            <td>₹<%= String.format("%.2f", product.getPricePerGram()) %></td>
                            <td class="action-buttons">
                                <a href="${pageContext.request.contextPath}/admin/edit-product.jsp?id=<%= product.getId() %>" class="btn btn-edit"><i class="fas fa-pencil-alt"></i> Edit</a>
                                <a href="${pageContext.request.contextPath}/admin/products?action=delete&id=<%= product.getId() %>" class="btn btn-delete" onclick="return confirm('Are you sure you want to delete this product?');"><i class="fas fa-trash-alt"></i> Delete</a>
                            </td>
                        </tr>
                    <% } %>
                </tbody>
            </table>
        </main>
    </div>

</body>
</html>
