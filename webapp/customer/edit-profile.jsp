<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.spiceheritage.model.User" %>
<%
    // Security check
    if (session.getAttribute("user") == null) {
        response.sendRedirect("index.jsp");
        return;
    }
    User user = (User) session.getAttribute("user");
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Profile - KNR Foods</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/styles.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/my-profile-styles.css">
</head>
<body>
    <main class="profile-container">
        <h1>Edit Profile</h1>
        <div class="profile-card">
            <form class="admin-form" action="${pageContext.request.contextPath}/update-profile" method="POST">
                <div class="form-group" style="grid-column: 1 / -1;">
                    <label>Full Name</label>
                    <input type="text" name="fullName" value="<%= user.getFullName() %>" required>
                </div>
                <div class="form-group" style="grid-column: 1 / -1;">
                    <label>Email Address</label>
                    <input type="email" name="email" value="<%= user.getEmail() %>" required>
                </div>
                <div class="form-group">
                    <label>Mobile Number</label>
                    <p style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; background-color: #f4f4f4;"><%= user.getMobileNumber() %> (Cannot be changed)</p>
                </div>
                <div style="grid-column: 1 / -1;">
                    <button type="submit" class="btn-edit-details">Save Changes</button>
                    <a href="${pageContext.request.contextPath}/customer/my-profile" class="btn-link">Cancel</a>
                </div>
            </form>
        </div>
    </main>
</body>
</html>
