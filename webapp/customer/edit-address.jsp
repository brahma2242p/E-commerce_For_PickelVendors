<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.spiceheritage.DAO.AddressDAO, com.spiceheritage.model.Address" %>
<%
    // Security check
    if (session.getAttribute("user") == null) {
        response.sendRedirect("index.jsp");
        return;
    }
    int addressId = Integer.parseInt(request.getParameter("id"));
    AddressDAO addressDAO = new AddressDAO();
    Address address = addressDAO.getAddressById(addressId);
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Address - KNR Foods</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/styles.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/my-profile-styles.css">
</head>
<body>
    <main class="profile-container">
        <h1>Edit Address</h1>
        <div class="profile-card">
            <form class="admin-form" action="${pageContext.request.contextPath}/address-manager" method="POST">
                <input type="hidden" name="action" value="update">
                <input type="hidden" name="addressId" value="<%= address.getAddressId() %>">
                <!-- Form fields pre-filled with address data -->
                <div class="form-group"><label>Full Name</label><input type="text" name="fullName" value="<%= address.getFullName() %>" required></div>
                <div class="form-group"><label>Mobile Number</label><input type="text" name="mobileNumber" value="<%= address.getMobileNumber() %>" required></div>
                <div class="form-group" style="grid-column: 1 / -1;"><label>Address Line 1</label><input type="text" name="addressLine1" value="<%= address.getAddressLine1() %>" required></div>
                <div class="form-group" style="grid-column: 1 / -1;"><label>Address Line 2 (Optional)</label><input type="text" name="addressLine2" value="<%= address.getAddressLine2() != null ? address.getAddressLine2() : "" %>"></div>
                <div class="form-group"><label>City</label><input type="text" name="city" value="<%= address.getCity() %>" required></div>
                <div class="form-group"><label>State</label><input type="text" name="state" value="<%= address.getState() %>" required></div>
                <div class="form-group"><label>Pincode</label><input type="text" name="pincode" value="<%= address.getPincode() %>" required></div>
                <div style="grid-column: 1 / -1;">
                    <button type="submit" class="btn-add-new-address">Update Address</button>
                    <a href="${pageContext.request.contextPath}/customer/my-profile" class="btn-link">Cancel</a>
                </div>
            </form>
        </div>
    </main>
</body>
</html>
