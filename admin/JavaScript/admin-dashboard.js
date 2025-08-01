document.addEventListener('DOMContentLoaded', () => {
    let isCheckingSession = false;

    (async function checkAdminSession() {
        if (isCheckingSession) return;
        isCheckingSession = true;
        try {
            const response = await fetch('/spiceheritage/admin/login');
            if (!response.ok) {
                window.location.href = 'login.html';
                return;
            }
            const data = await response.json();
            if (data.loggedIn) {
                document.getElementById('adminUsername').textContent = data.username;
                fetchDashboardData();
            } else {
                window.location.href = 'login.html';
            }
        } catch (error) {
            console.error("Session check failed:", error);
            window.location.href = 'login.html';
        } finally {
            isCheckingSession = false;
        }
    })();

    async function fetchDashboardData() {
        try {
            const response = await fetch('/spiceheritage/admin/dashboard-data');
            const data = await response.json();
            
            // Populate KPI Cards
            document.getElementById('productCount').textContent = data.productCount;
            document.getElementById('userCount').textContent = data.userCount;
            document.getElementById('monthlySales').textContent = `₹${data.monthlySales.toFixed(2)}`;
            document.getElementById('yearlySales').textContent = `₹${data.yearlySales.toFixed(2)}`;

            // Populate Recent Orders Table
            const recentOrdersTable = document.getElementById('recentOrdersTable');
            recentOrdersTable.innerHTML = '';
            if (data.recentOrders && data.recentOrders.length > 0) {
                data.recentOrders.forEach(order => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>#${order.orderId}</td>
                        <td>${order.customerName}</td>
                        <td>₹${order.totalAmount.toFixed(2)}</td>
                        <td><span class="status-badge status-${order.orderStatus.toLowerCase()}">${order.orderStatus}</span></td>
                    `;
                    recentOrdersTable.appendChild(row);
                });
            } else {
                recentOrdersTable.innerHTML = '<tr><td colspan="4">No recent orders.</td></tr>';
            }

            // Populate Top Selling Products Table
            const topProductsTable = document.getElementById('topProductsTable');
            topProductsTable.innerHTML = '';
            if (data.topProducts && data.topProducts.length > 0) {
                data.topProducts.forEach(product => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${product.name}</td>
                        <td>${product.category}</td>
                        <td>${product.description}</td> 
                    `;
                    topProductsTable.appendChild(row);
                });
            } else {
                topProductsTable.innerHTML = '<tr><td colspan="3">No sales data available.</td></tr>';
            }

        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            await fetch('/spiceheritage/admin/logout', { method: 'POST' });
            window.location.href = 'login.html';
        });
    }
});