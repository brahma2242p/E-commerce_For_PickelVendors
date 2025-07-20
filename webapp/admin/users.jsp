<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.spiceheritage.DAO.UserDAO, com.spiceheritage.model.User, java.util.List, java.text.SimpleDateFormat" %>
<%
    if (session.getAttribute("adminUser") == null) {
        response.sendRedirect(request.getContextPath() + "/admin/login.jsp");
        return;
    }
    UserDAO userDAO = new UserDAO();
    List<User> userList = userDAO.getAllUsers();
    SimpleDateFormat dateFormat = new SimpleDateFormat("dd MMM yyyy");
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Users - KNR Foods</title>
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
                <li><a href="${pageContext.request.contextPath}/admin/products.jsp"><i class="fas fa-box-open"></i> Products</a></li>
                <!-- CORRECTED: This link now points to your orders page -->
                <li><a href="${pageContext.request.contextPath}/admin/orders.jsp"><i class="fas fa-shopping-cart"></i> Orders</a></li>
                <li class="active"><a href="${pageContext.request.contextPath}/admin/users.jsp"><i class="fas fa-users"></i> Users</a></li>
                <li><a href="#"><i class="fas fa-lightbulb"></i> Suggestions</a></li>
            </ul>
        </nav>
    </aside>

    <div class="admin-main-content">
        <header class="admin-header">
            <h1>User Management</h1>
            <div class="admin-user-info">
                <span>Welcome, <strong><%= session.getAttribute("adminUser") %></strong></span>
                <a href="${pageContext.request.contextPath}/admin/logout" class="logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</a>
            </div>
        </header>

        <main class="admin-page-content">
            <div class="content-header">
                <h2>All Registered Users</h2>
            </div>

            <table class="admin-table">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Mobile Number</th>
                        <th>Registration Date</th>
                    </tr>
                </thead>
                <tbody>
                    <% for (User user : userList) { %>
                        <tr>
                            <td><%= user.getUserId() %></td>
                            <td><a href="${pageContext.request.contextPath}/admin/user-details?id=<%= user.getUserId() %>"><%= user.getFullName() %></a></td>
                            <td><%= user.getEmail() %></td>
                            <td><%= user.getMobileNumber() %></td>
                            <td><%= user.getRegistrationDate() != null ? dateFormat.format(user.getRegistrationDate()) : "N/A" %></td>
                        </tr>
                    <% } %>
                </tbody>
            </table>
        </main>
    </div>

</body>
</html>
