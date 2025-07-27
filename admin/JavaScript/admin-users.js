document.addEventListener('DOMContentLoaded', () => {
    // --- Security Check ---
    let isCheckingSession = false; // Guard to prevent race conditions

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
                fetchAndRenderUsers();
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

    // --- Fetch and Render Users ---
    async function fetchAndRenderUsers() {
        const tableBody = document.getElementById('usersTableBody');
        try {
            const response = await fetch('/spiceheritage/admin/api/users');
            const users = await response.json();

            tableBody.innerHTML = '';

            if (users.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="6">No users found.</td></tr>';
                return;
            }

            users.forEach(user => {
                const row = document.createElement('tr');
                const registrationDate = new Date(user.registrationDate).toLocaleDateString('en-IN');
                
                row.innerHTML = `
                    <td>${user.userId}</td>
                    <td>${user.fullName}</td>
                    <td>${user.email}</td>
                    <td>${user.mobileNumber}</td>
                    <td>${registrationDate}</td>
                    <td class="action-buttons">
                        <a href="user-details.html?id=${user.userId}" class="btn btn-edit"><i class="fas fa-eye"></i> View Details</a>
                    </td>
                `;
                tableBody.appendChild(row);
            });

        } catch (error) {
            console.error('Error fetching users:', error);
            tableBody.innerHTML = '<tr><td colspan="6">Error loading users.</td></tr>';
        }
    }
    
    // --- Logout Handler ---
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            await fetch('/spiceheritage/admin/logout', { method: 'POST' });
            window.location.href = 'login.html';
        });
    }
});
