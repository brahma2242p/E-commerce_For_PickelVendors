<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.spiceheritage.model.User, com.spiceheritage.model.Address, java.util.List" %>
<%
    // Security check
    if (session.getAttribute("adminUser") == null) {
        response.sendRedirect(request.getContextPath() + "/admin/login.jsp");
        return;
    }

    // Get the user and address data that was fetched by the servlet
    User user = (User) request.getAttribute("user");
    List<Address> addresses = (List<Address>) request.getAttribute("addresses");
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Details - KNR Foods</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/styles.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/admin/admin-styles.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body class="admin-dashboard-body">
    <aside class="admin-sidebar">
        <!-- ... sidebar navigation ... -->
        <div class="sidebar-header"><h3>KNR Foods - Admin</h3></div>
        <nav class="sidebar-nav">
            <ul>
                <li><a href="${pageContext.request.contextPath}/admin/dashboard.jsp"><i class="fas fa-tachometer-alt"></i> Dashboard</a></li>
                <li><a href="${pageContext.request.contextPath}/admin/products.jsp"><i class="fas fa-box-open"></i> Products</a></li>
                <li><a href="#"><i class="fas fa-shopping-cart"></i> Orders</a></li>
                <li class="active"><a href="${pageContext.request.contextPath}/admin/users.jsp"><i class="fas fa-users"></i> Users</a></li>
                <li><a href="#"><i class="fas fa-lightbulb"></i> Suggestions</a></li>
            </ul>
        </nav>
    </aside>

    <div class="admin-main-content">
        <header class="admin-header">
            <h1>User Details: <%= user.getFullName() %></h1>
            <a href="${pageContext.request.contextPath}/admin/users.jsp" class="btn">&larr; Back to User List</a>
        </header>

        <main class="admin-page-content">
            <div class="content-header">
                <h2>Saved Addresses</h2>
            </div>

            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Address ID</th>
                        <th>Full Address</th>
                        <th>Mobile</th>
                    </tr>
                </thead>
                <tbody>
                    <% if (addresses == null || addresses.isEmpty()) { %>
                        <tr>
                            <td colspan="3">This user has not saved any addresses yet.</td>
                        </tr>
                    <% } else { %>
                        <% for (Address address : addresses) { %>
                            <tr>
                                <td><%= address.getAddressId() %></td>
                                <td>
                                    <%= address.getFullName() %>, 
                                    <%= address.getAddressLine1() %>, 
                                    <%= address.getAddressLine2() != null ? address.getAddressLine2() + "," : "" %>
                                    <%= address.getCity() %>, 
                                    <%= address.getState() %> - <%= address.getPincode() %>
                                </td>
                                <td><%= address.getMobileNumber() %></td>
                            </tr>
                        <% } %>
                    <% } %>
                </tbody>
            </table>
        </main>
    </div>
</body>
</html>
