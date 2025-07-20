<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - KNR Foods</title>
    
    <!-- CORRECTED: Using context path to ensure CSS files are always found -->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/styles.css">
    
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        /* This style ensures the login box is centered on the page */
        body {
            background: linear-gradient(90deg, #f57c00, #d90429);
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
        }
    </style>
</head>
<body>

    <div class="auth-modal active" style="position: static; background: none;">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Admin Login</h3>
            </div>
            <div class="modal-body">
                <div class="auth-form active" id="loginForm">
                    <h3>Welcome, Admin!</h3>
                    
                    <%-- This part will display an error message if the login fails --%>
                    <%
                        String error = request.getParameter("error");
                        if (error != null && error.equals("1")) {
                            out.println("<p style='color:red; text-align:center; margin-bottom:1rem;'>Invalid username or password.</p>");
                        }
                    %>

                    <!-- CORRECTED: Using context path for the form action to ensure it finds the servlet -->
                    <form id="adminLoginFormSubmit" method="post" action="${pageContext.request.contextPath}/admin/login">
                        <div class="form-group">
                            <input type="text" name="username" placeholder="Username" required>
                        </div>
                        <div class="form-group password-group">
                            <input type="password" name="password" placeholder="Password" required>
                            <button type="button" class="toggle-password">
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                        <div class="form-options">
                            <a href="#" class="forgot-password">Forgot Password?</a>
                        </div>
                        <button type="submit" class="auth-btn">Login</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- We still need the main script for the password toggle to work -->
    <script src="${pageContext.request.contextPath}/JavaScript/script.js"></script>
</body>
</html>