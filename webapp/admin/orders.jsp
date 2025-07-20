<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.spiceheritage.DAO.OrderDAO, com.spiceheritage.model.Order, java.util.List, java.text.SimpleDateFormat" %>
<%
    // Security check
    if (session.getAttribute("adminUser") == null) {
        response.sendRedirect(request.getContextPath() + "/admin/login.jsp");
        return;
    }

    // Use the OrderDAO to fetch all orders
    OrderDAO orderDAO = new OrderDAO();
    List<Order> orderList = orderDAO.getAllOrders(); // We will create this method next
    SimpleDateFormat dateFormat = new SimpleDateFormat("dd MMM yyyy");
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Orders - KNR Foods</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/styles.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/admin/admin-styles.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body class="admin-dashboard-body">

    <!-- Sidebar Navigation -->
    <aside class="admin-sidebar">
        <div class="sidebar-header">
            <h3>KNR Foods - Admin</h3>
        </div>
        <nav class="sidebar-nav">
            <ul>
                <li><a href="${pageContext.request.contextPath}/admin/dashboard.jsp"><i class="fas fa-tachometer-alt"></i> Dashboard</a></li>
                <li><a href="${pageContext.request.contextPath}/admin/products.jsp"><i class="fas fa-box-open"></i> Products</a></li>
                <li class="active"><a href="${pageContext.request.contextPath}/admin/orders.jsp"><i class="fas fa-shopping-cart"></i> Orders</a></li>
                <li><a href="${pageContext.request.contextPath}/admin/users.jsp"><i class="fas fa-users"></i> Users</a></li>
                <li><a href="#"><i class="fas fa-lightbulb"></i> Suggestions</a></li>
            </ul>
        </nav>
    </aside>

    <!-- Main Content -->
    <div class="admin-main-content">
        <header class="admin-header">
            <h1>Order Management</h1>
            <div class="admin-user-info">
                <span>Welcome, <strong><%= session.getAttribute("adminUser") %></strong></span>
                <a href="${pageContext.request.contextPath}/admin/logout" class="logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</a>
            </div>
        </header>

        <main class="admin-page-content">
            <div class="content-header">
                <h2>All Customer Orders</h2>
            </div>

            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer Name</th>
                        <th>Order Date</th>
                        <th>Total Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <% for (Order order : orderList) { %>
                        <tr>
                            <td>#<%= order.getOrderId() %></td>
                            <td><%= order.getCustomerName() %></td>
                            <td><%= dateFormat.format(order.getOrderDate()) %></td>
                            <td>₹<%= String.format("%.2f", order.getTotalAmount()) %></td>
                            <td><span class="status-<%= order.getOrderStatus().toLowerCase() %>"><%= order.getOrderStatus() %></span></td>
                        </tr>
                    <% } %>
                </tbody>
            </table>
        </main>
    </div>

</body>
</html>
