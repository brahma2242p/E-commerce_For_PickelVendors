<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%
    // Security check
    if (session.getAttribute("user") == null) {
        response.sendRedirect("index.jsp");
        return;
    }
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add New Address - KNR Foods</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/styles.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/my-profile-styles.css">
</head>
<body>
    <main class="profile-container">
        <h1>Add New Address</h1>
        <div class="profile-card">
            <form class="admin-form" action="${pageContext.request.contextPath}/address-manager" method="POST">
                <input type="hidden" name="action" value="add">
                <!-- Form fields for the new address -->
                <div class="form-group"><label>Full Name</label><input type="text" name="fullName" required></div>
                <div class="form-group"><label>Mobile Number</label><input type="text" name="mobileNumber" required></div>
                <div class="form-group" style="grid-column: 1 / -1;"><label>Address Line 1</label><input type="text" name="addressLine1" required></div>
                <div class="form-group" style="grid-column: 1 / -1;"><label>Address Line 2 (Optional)</label><input type="text" name="addressLine2"></div>
                <div class="form-group"><label>City</label><input type="text" name="city" required></div>
                <div class="form-group"><label>State</label><input type="text" name="state" required></div>
                <div class="form-group"><label>Pincode</label><input type="text" name="pincode" required></div>
                <div style="grid-column: 1 / -1;">
                    <button type="submit" class="btn-add-new-address">Save Address</button>
                    <a href="${pageContext.request.contextPath}/customer/my-profile" class="btn-link">Cancel</a>
                </div>
            </form>
        </div>
    </main>
</body>
</html>
