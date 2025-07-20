<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.spiceheritage.DAO.AdminDAO" %>
<%
    // Security check
    if (session.getAttribute("adminUser") == null) {
        response.sendRedirect(request.getContextPath() + "/admin/login.jsp");
        return;
    }

    // Fetch the data for the dashboard cards
    AdminDAO adminDAO = new AdminDAO();
    int productCount = adminDAO.getProductCount();
    int userCount = adminDAO.getUserCount();
    double monthlySales = adminDAO.getMonthlySales();
    double yearlySales = adminDAO.getYearlySales();
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - KNR Foods</title>
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
                <li class="active"><a href="${pageContext.request.contextPath}/admin/dashboard.jsp"><i class="fas fa-tachometer-alt"></i> Dashboard</a></li>
                <li><a href="${pageContext.request.contextPath}/admin/products.jsp"><i class="fas fa-box-open"></i> Products</a></li>
                <li><a href="${pageContext.request.contextPath}/admin/orders.jsp"><i class="fas fa-shopping-cart"></i> Orders</a></li>
                <li><a href="${pageContext.request.contextPath}/admin/users.jsp"><i class="fas fa-users"></i> Users</a></li>
                <li><a href="#"><i class="fas fa-lightbulb"></i> Suggestions</a></li>
            </ul>
        </nav>
    </aside>

    <!-- Main Content -->
    <div class="admin-main-content">
        <header class="admin-header">
            <h1>Dashboard</h1>
            <div class="admin-user-info">
                <span>Welcome, <strong><%= session.getAttribute("adminUser") %></strong></span>
                <a href="${pageContext.request.contextPath}/admin/logout" class="logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</a>
            </div>
        </header>

        <!-- Main Dashboard Area with Statistic Cards -->
        <main class="admin-dashboard">
            <div class="dashboard-cards">
                <div class="card">
                    <div class="card-icon"><i class="fas fa-box-open"></i></div>
                    <div class="card-info">
                        <h4>Total Products</h4>
                        <p><%= productCount %></p>
                    </div>
                </div>
                <div class="card">
                    <div class="card-icon"><i class="fas fa-users"></i></div>
                    <div class="card-info">
                        <h4>Registered Users</h4>
                        <p><%= userCount %></p>
                    </div>
                </div>
                <!-- NEW: Monthly Sales Card -->
                <div class="card">
                    <div class="card-icon"><i class="fas fa-calendar-day"></i></div>
                    <div class="card-info">
                        <h4>Sales (This Month)</h4>
                        <p>₹<%= String.format("%.2f", monthlySales) %></p>
                    </div>
                </div>
                <!-- NEW: Yearly Sales Card -->
                <div class="card">
                    <div class="card-icon"><i class="fas fa-calendar-alt"></i></div>
                    <div class="card-info">
                        <h4>Sales (This Year)</h4>
                        <p>₹<%= String.format("%.2f", yearlySales) %></p>
                    </div>
                </div>
            </div>
        </main>
    </div>

</body>
</html>
